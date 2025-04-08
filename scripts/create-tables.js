const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function createTables() {
  try {
    await client.connect();
    console.log('Connected to database');

    const sql = `
      CREATE TABLE IF NOT EXISTS "organization" (
        "id" text PRIMARY KEY NOT NULL,
        "stripe_customer_id" text,
        "stripe_subscription_id" text,
        "stripe_subscription_price_id" text,
        "stripe_subscription_status" text,
        "stripe_subscription_current_period_end" bigint,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "todo" (
        "id" serial PRIMARY KEY NOT NULL,
        "owner_id" text NOT NULL,
        "title" text NOT NULL,
        "message" text NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
      );

      CREATE UNIQUE INDEX IF NOT EXISTS "stripe_customer_id_idx" ON "organization" USING btree ("stripe_customer_id");
    `;

    await client.query(sql);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    await client.end();
  }
}

createTables(); 