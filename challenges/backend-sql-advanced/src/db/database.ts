import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "node:path";

const db_path = path.join(process.cwd(), "db", "blogPostings.db");

let db: Database | null = null;

export async function connectToDatabase() {
  db = await open({ filename: db_path, driver: sqlite3.Database });
  return db;
}

export function getDatabase(): Database {
  if (!db) {
    throw new Error("Database not connected. Call connectToDatabase() first.");
  }
  return db;
}

export async function closeDatabase() {
  if (db) {
    await db.close();
    db = null;
  }
}
