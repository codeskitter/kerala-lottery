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
