import cors from 'cors';
import { config } from '../config/env';

// In development, allow all localhost origins for flexibility
// In production, use strict origin from env
const corsOrigin = config.server.env === 'development'
  ? (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Allow requests with no origin (like mobile apps, Postman, curl)
      if (!origin) return callback(null, true);

      // Allow all localhost origins in development
      if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return callback(null, true);
      }

      // Reject other origins
      callback(new Error('Not allowed by CORS'));
    }
  : config.cors.origin; // Production: strict origin

export const corsMiddleware = cors({
  origin: corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
