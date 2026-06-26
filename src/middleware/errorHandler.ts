import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[Error] ${err.name}: ${err.message}`);

  // Zod validation errors
if (err instanceof ZodError) {
  return res.status(400).json({
    success: false,
    error: 'ValidationError',
    message: (err as ZodError).issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')
  });
}

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.name,
      message: err.message
    });
  }

  // Unknown errors
  return res.status(500).json({
    success: false,
    error: 'InternalServerError',
    message: 'Something went wrong'
  });
};