import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import * as crmSchema from "@shared/crm-schema";

neonConfig.webSocketConstructor = ws;

// Use in-memory storage if DATABASE_URL is not provided
const databaseUrl = process.env.DATABASE_URL || "";

if (!process.env.DATABASE_URL) {
  console.log("No DATABASE_URL found. Using in-memory storage for development.");
}

export const pool = process.env.DATABASE_URL ? new Pool({ connectionString: process.env.DATABASE_URL }) : null;
export const db = pool ? drizzle({ client: pool, schema: { ...schema, ...crmSchema } }) : null;
