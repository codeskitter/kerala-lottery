import { executeQuery } from "../database"

export interface UserRegistration {
  id: number
  lottery_type: string
  ticket_number: string
  name: string
  email: string
  mobile: string
  transaction_id?: string
  payment_status: "pending" | "verified" | "rejected"
  registration_date: Date
  verified_at?: Date
  verified_by?: number
  notes?: string
}

export class UserRegistrationModel {
  static async create(registration: Omit<UserRegistration, "id" | "registration_date">): Promise<number | null> {
    try {
      const query = `
        INSERT INTO user_registrations 
        (lottery_type, ticket_number, name, email, mobile, transaction_id, payment_status, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `
      const values = [
        registration.lottery_type,
        registration.ticket_number,
        registration.name,
        registration.email,
        registration.mobile,
        registration.transaction_id || null,
        registration.payment_status || "pending",
        registration.notes || null,
      ]

      const result = (await executeQuery(query, values)) as any
      return result.insertId
    } catch (error) {
      console.error("Error creating user registration:", error)
      return null
    }
  }

  static async findByTicketNumber(ticketNumber: string): Promise<UserRegistration | null> {
    try {
      const query = "SELECT * FROM user_registrations WHERE ticket_number = ? ORDER BY id DESC LIMIT 1"
      const results = (await executeQuery(query, [ticketNumber])) as UserRegistration[]
      return results[0] || null
    } catch (error) {
      console.error("Error finding registration by ticket number:", error)
      return null
    }
  }

  static async findByMobile(mobile: string): Promise<UserRegistration[]> {
    try {
      const query = "SELECT * FROM user_registrations WHERE mobile = ? ORDER BY registration_date DESC"
      const results = (await executeQuery(query, [mobile])) as UserRegistration[]
      return results
    } catch (error) {
      console.error("Error finding registrations by mobile:", error)
      return []
    }
  }

  static async updatePaymentStatus(
    id: number,
    status: "pending" | "verified" | "rejected",
    verifiedBy?: number,
    notes?: string,
  ): Promise<boolean> {
    try {
      const query = `
        UPDATE user_registrations 
        SET payment_status = ?, verified_at = ?, verified_by = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `
      const verifiedAt = status === "verified" ? new Date() : null
      await executeQuery(query, [status, verifiedAt, verifiedBy || null, notes || null, id])
      return true
    } catch (error) {
      console.error("Error updating payment status:", error)
      return false
    }
  }

  static async getAll(limit = 50, offset = 0): Promise<UserRegistration[]> {
    try {
      const query = `
        SELECT * FROM user_registrations 
        ORDER BY registration_date DESC 
        LIMIT ? OFFSET ?
      `
      const results = (await executeQuery(query, [limit, offset])) as UserRegistration[]
      return results
    } catch (error) {
      console.error("Error fetching all registrations:", error)
      return []
    }
  }
}
