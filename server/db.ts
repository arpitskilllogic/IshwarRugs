import "dotenv/config";
import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import * as schema from "@shared/schema";

console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL); // 👈 Add this

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = new PrismaClient();
