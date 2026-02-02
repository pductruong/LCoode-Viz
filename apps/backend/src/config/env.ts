import dotenv from 'dotenv';
import { envSchema } from '@lcode-viz/schemas';

dotenv.config();

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
