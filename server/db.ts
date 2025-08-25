import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";
import * as crmSchema from "@shared/crm-schema";

// Use PostgreSQL with connection string
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

console.log("Using PostgreSQL database storage");

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema: { ...schema, ...crmSchema } });
