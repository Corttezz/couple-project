import path from 'node:path';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { migrate as migratePg } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';
import * as schema from '@/models/Schema';
import { Env } from './Env';

const client = new Client({
  connectionString: Env.DATABASE_URL,
});

await client.connect();

const drizzle = drizzlePg(client, { schema });
await migratePg(drizzle, {
  migrationsFolder: path.join(process.cwd(), 'migrations'),
});

export const db = drizzle;
