import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";
import * as crmSchema from "@shared/crm-schema";

// Use PostgreSQL with connection string if available
let pool: Pool | null = null;
let db: any = null;

if (process.env.DATABASE_URL) {
  console.log("Using PostgreSQL database storage");
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  db = drizzle({ client: pool, schema: { ...schema, ...crmSchema } });
} else {
  console.log("DATABASE_URL not found, will use in-memory storage");
}

export { pool, db };
