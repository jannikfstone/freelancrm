import type { Config } from 'drizzle-kit';

console.log('Database URL:', process.env.DATABASE_URL);

/** @type {import('drizzle-kit').Config} */
export default {
  out: './migrations',
  dialect: 'postgresql',
  verbose: true,
  schema: './src/models/Schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
} satisfies Config;
