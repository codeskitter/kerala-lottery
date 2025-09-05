import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { executeQuery } from "./database"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"
const JWT_EXPIRES_IN = "7d"

export interface AdminUser {
  id: number
  username: string
  email: string
  role: "super_admin" | "admin" | "editor"
  is_active: boolean
}

export interface AuthToken {
  token: string
  user: AdminUser
}

export class AuthService {
  static async login(username: string, password: string): Promise<AuthToken | null> {
    try {
      const query = "SELECT * FROM admin_users WHERE (username = ? OR email = ?) AND is_active = TRUE"
      const results = (await executeQuery(query, [username, username])) as any[]

      if (results.length === 0) {
        return null
      }

      const user = results[0]
      const isValidPassword = await bcrypt.compare(password, user.password_hash)

      if (!isValidPassword) {
        return null
      }

      // Update last login
      await executeQuery("UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?", [user.id])

      // Generate JWT token
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN },
      )

      const userResponse: AdminUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
      }

      return { token, user: userResponse }
    } catch (error) {
      console.error("Login error:", error)
      return null
    }
  }

  static async verifyToken(token: string): Promise<AdminUser | null> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any

      const query = "SELECT * FROM admin_users WHERE id = ? AND is_active = TRUE"
      const results = (await executeQuery(query, [decoded.id])) as any[]

      if (results.length === 0) {
        return null
      }

      const user = results[0]
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
      }
    } catch (error) {
      console.error("Token verification error:", error)
      return null
    }
  }

  static async createAdmin(
    username: string,
    email: string,
    password: string,
    role: "super_admin" | "admin" | "editor" = "admin",
  ): Promise<number | null> {
    try {
      const hashedPassword = await bcrypt.hash(password, 12)

      const query = `
        INSERT INTO admin_users (username, email, password_hash, role)
        VALUES (?, ?, ?, ?)
      `
      const result = (await executeQuery(query, [username, email, hashedPassword, role])) as any
      return result.insertId
    } catch (error) {
      console.error("Create admin error:", error)
      return null
    }
  }

  static async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<boolean> {
    try {
      const query = "SELECT password_hash FROM admin_users WHERE id = ?"
      const results = (await executeQuery(query, [userId])) as any[]

      if (results.length === 0) {
        return false
      }

      const isValidPassword = await bcrypt.compare(currentPassword, results[0].password_hash)
      if (!isValidPassword) {
        return false
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 12)
      await executeQuery("UPDATE admin_users SET password_hash = ? WHERE id = ?", [hashedNewPassword, userId])

      return true
    } catch (error) {
      console.error("Change password error:", error)
      return false
    }
  }
}

export async function verifyAuth(token: string): Promise<AdminUser | null> {
  return AuthService.verifyToken(token)
}
