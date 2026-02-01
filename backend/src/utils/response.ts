import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    [key: string]: any;
  };
}

export class ResponseBuilder {
  static success<T>(res: Response, data: T, statusCode = 200): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };
    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    message: string,
    statusCode = 500,
    code?: string,
    details?: any
  ): Response {
    const response: ApiResponse = {
      success: false,
      error: {
        message,
        code,
        details,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    };
    return res.status(statusCode).json(response);
  }

  static notFound(res: Response, resource: string): Response {
    return this.error(res, `${resource} not found`, 404, 'NOT_FOUND');
  }

  static badRequest(res: Response, message: string, details?: any): Response {
    return this.error(res, message, 400, 'BAD_REQUEST', details);
  }

  static serverError(res: Response, error: Error): Response {
    return this.error(res, 'Internal server error', 500, 'SERVER_ERROR', {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}
