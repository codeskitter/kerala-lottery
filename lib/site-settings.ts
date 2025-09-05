import { executeQuery } from "../database"

export interface SiteSettings {
  id: number
  site_name: string
  site_logo?: string
  contact_phone?: string
  contact_email?: string
  address?: string
  upi_id?: string
  bank_name?: string
  account_name?: string
  account_number?: string
  ifsc_code?: string
  payment_phone?: string
  registration_amount: number
  created_at: Date
  updated_at: Date
}

export class SiteSettingsModel {
  static async get(): Promise<SiteSettings | null> {
    try {
      const results = (await executeQuery("SELECT * FROM site_settings ORDER BY id DESC LIMIT 1")) as SiteSettings[]
      return results[0] || null
    } catch (error) {
      console.error("Error fetching site settings:", error)
      return null
    }
  }

  static async update(settings: Partial<SiteSettings>): Promise<boolean> {
    try {
      const fields = Object.keys(settings).filter((key) => key !== "id")
      const values = fields.map((field) => settings[field as keyof SiteSettings])

      const setClause = fields.map((field) => `${field} = ?`).join(", ")
      const query = `UPDATE site_settings SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = 1`

      await executeQuery(query, values)
      return true
    } catch (error) {
      console.error("Error updating site settings:", error)
      return false
    }
  }

  static async create(settings: Omit<SiteSettings, "id" | "created_at" | "updated_at">): Promise<number | null> {
    try {
      const fields = Object.keys(settings)
      const values = Object.values(settings)
      const placeholders = fields.map(() => "?").join(", ")

      const query = `INSERT INTO site_settings (${fields.join(", ")}) VALUES (${placeholders})`
      const result = (await executeQuery(query, values)) as any

      return result.insertId
    } catch (error) {
      console.error("Error creating site settings:", error)
      return null
    }
  }
}
