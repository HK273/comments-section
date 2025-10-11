import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import { querylogger } from '@/app/classes/loggers/query';

/**
 * Database Configuration Module
 *
 * This module sets up the database connection using Drizzle ORM.
 * It loads environment variables and initialises the database connection.
 * It utilises the QueryLogger class to provide us with additional logs
 * of the SQL queries being executed
 *
 */

config({ path: '.env.local' });

let dbInstance: ReturnType<typeof drizzle> | null = null;

/**
 * Get Drizzle ORM database instance
 *
 * This function provides a configured singleton instance of Drizzle ORM,
 * ready to be used for database operations throughout the application.
 *
 * @throws - Will throw an error if DB_URL is not defined in the environment variables.
 * @returns configured singleton instance of Drizzle ORM DB
 */
export function getDb() {
  if (!dbInstance) {
    if (!process.env.DB_URL) {
      throw new Error('DB_URL is not defined in the environment variables.');
    }
    const sql = neon(process.env.DB_URL);
    dbInstance = drizzle(sql, { logger: querylogger });
  }
  return dbInstance;
}
