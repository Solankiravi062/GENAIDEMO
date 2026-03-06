import 'dotenv/config';
import type { Config } from 'drizzle-kit';

const config = {
  out: './drizzle',
  schema: './db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;

export default config;
