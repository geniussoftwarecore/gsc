import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";
import * as crmSchema from "@shared/crm-schema";

// Use PostgreSQL with connection string if available
let pool: Pool | null = null;
let db: any = null;

// Only attempt database connection if DATABASE_URL is explicitly provided
// This ensures clean fallback to in-memory storage in Replit environment
if (process.env.DATABASE_URL) {
  try {
    console.log("DATABASE_URL found, attempting PostgreSQL connection...");
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    db = drizzle({ client: pool, schema: { ...schema, ...crmSchema } });
    console.log("PostgreSQL database connection established");
  } catch (error) {
    console.log("Failed to connect to PostgreSQL, falling back to in-memory storage:", error);
    pool = null;
    db = null;
  }
} else {
  console.log("DATABASE_URL not found, using in-memory storage");
}

export { pool, db };
