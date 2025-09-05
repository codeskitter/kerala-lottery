import mysql from "mysql2/promise"

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "kerala_lottery",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Create connection pool
const pool = mysql.createPool(dbConfig)

// Database connection helper
export async function getConnection() {
  try {
    return await pool.getConnection()
  } catch (error) {
    console.error("Database connection failed:", error)
    throw new Error("Failed to connect to database")
  }
}

// Execute query helper
export async function executeQuery(query: string, params: any[] = []) {
  const connection = await getConnection()
  try {
    const [results] = await connection.execute(query, params)
    return results
  } catch (error) {
    console.error("Query execution failed:", error)
    throw error
  } finally {
    connection.release()
  }
}

// Execute multiple queries in transaction
export async function executeTransaction(queries: { query: string; params: any[] }[]) {
  const connection = await getConnection()
  try {
    await connection.beginTransaction()

    const results = []
    for (const { query, params } of queries) {
      const [result] = await connection.execute(query, params)
      results.push(result)
    }

    await connection.commit()
    return results
  } catch (error) {
    await connection.rollback()
    console.error("Transaction failed:", error)
    throw error
  } finally {
    connection.release()
  }
}

export async function queryFirst<T = any>(query: string, params: any[] = []): Promise<T | null> {
  const results = (await executeQuery(query, params)) as T[]
  return results[0] || null
}

export async function queryAll<T = any>(query: string, params: any[] = []): Promise<T[]> {
  return (await executeQuery(query, params)) as T[]
}

export async function queryCount(table: string, whereClause?: string, params: any[] = []): Promise<number> {
  const query = whereClause
    ? `SELECT COUNT(*) as count FROM ${table} WHERE ${whereClause}`
    : `SELECT COUNT(*) as count FROM ${table}`

  const result = await queryFirst<{ count: number }>(query, params)
  return result?.count || 0
}

export async function insertRecord(table: string, data: Record<string, any>): Promise<number> {
  const fields = Object.keys(data)
  const values = Object.values(data)
  const placeholders = fields.map(() => "?").join(", ")

  const query = `INSERT INTO ${table} (${fields.join(", ")}) VALUES (${placeholders})`
  const result = (await executeQuery(query, values)) as any
  return result.insertId
}

export async function updateRecord(
  table: string,
  data: Record<string, any>,
  whereClause: string,
  whereParams: any[] = [],
): Promise<boolean> {
  const fields = Object.keys(data)
  const values = Object.values(data)
  const setClause = fields.map((field) => `${field} = ?`).join(", ")

  const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`
  await executeQuery(query, [...values, ...whereParams])
  return true
}

export async function deleteRecord(table: string, whereClause: string, params: any[] = []): Promise<boolean> {
  const query = `DELETE FROM ${table} WHERE ${whereClause}`
  await executeQuery(query, params)
  return true
}

export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await executeQuery("SELECT 1")
    return true
  } catch (error) {
    console.error("Database health check failed:", error)
    return false
  }
}
