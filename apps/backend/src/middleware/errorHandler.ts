import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';
import { ResponseBuilder } from '../utils/response';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error('Error occurred:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    ResponseBuilder.badRequest(res, 'Validation error', err.issues);
    return;
  }

  // Handle custom app errors
  if (err instanceof AppError) {
    ResponseBuilder.error(res, err.message, err.statusCode, err.code);
    return;
  }

  // Handle Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    ResponseBuilder.error(res, 'Database error', 400, 'DATABASE_ERROR');
    return;
  }

  // Default server error
  ResponseBuilder.serverError(res, err);
}

export function notFoundHandler(req: Request, res: Response): void {
  ResponseBuilder.notFound(res, 'Route');
}
