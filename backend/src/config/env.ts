import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
});

const envVars = envSchema.parse(process.env);

export const config = {
  database: {
    url: envVars.DATABASE_URL,
  },
  server: {
    port: parseInt(envVars.PORT, 10),
    env: envVars.NODE_ENV,
  },
  cors: {
    origin: envVars.CORS_ORIGIN,
  },
} as const;
