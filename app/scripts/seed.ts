import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import { user } from '@/app/db/models';

config({ path: '.env.local' });

const sql = neon(process.env.DB_URL!);
const db = drizzle(sql);

/**
 * Test seeding the database with a new user
 * Updating the user's age
 * Getting all users from the database
 * Deleting the user
 *
 * To run: pnpm tsx app/scripts/seed.ts
 */

async function main() {
  const testUser: typeof user.$inferInsert = {
    id: 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
  };

  await db.insert(user).values(testUser);
  console.log('New user created!');

  const users = await db.select().from(user);
  console.log('Getting all users from the database: ', users);

  await db
    .update(user)
    .set({
      name: 'John Updated',
    })
    .where(eq(user.email, testUser.email));
  console.log('User info updated!');

  await db.delete(user).where(eq(user.email, testUser.email));
  console.log('User deleted!');
}

main();
