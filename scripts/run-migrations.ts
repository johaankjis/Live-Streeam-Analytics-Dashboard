import { neon } from "@neondatabase/serverless"
import { readFileSync } from "fs"
import { join } from "path"

const sql = neon(process.env.DATABASE_URL!)

async function runMigrations() {
  console.log("[v0] Running database migrations...")

  try {
    // Read and execute migration files
    const migrations = ["001-create-tables.sql", "002-seed-data.sql"]

    for (const migration of migrations) {
      console.log(`[v0] Running migration: ${migration}`)
      const migrationPath = join(process.cwd(), "scripts", migration)
      const migrationSQL = readFileSync(migrationPath, "utf-8")

      // Split by semicolon and execute each statement
      const statements = migrationSQL
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      for (const statement of statements) {
        await sql.unsafe(statement)
      }

      console.log(`[v0] Completed migration: ${migration}`)
    }

    console.log("[v0] All migrations completed successfully!")
  } catch (error) {
    console.error("[v0] Migration failed:", error)
    process.exit(1)
  }
}

runMigrations()
