import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const error = err as Error & { status?: number; code?: string; details?: unknown };
  const status = error.status ?? 500;
  res.status(status).json({
    success: false,
    message: error.message || 'Internal Server Error',
    code: error.code,
    details: error.details,
  });
}
