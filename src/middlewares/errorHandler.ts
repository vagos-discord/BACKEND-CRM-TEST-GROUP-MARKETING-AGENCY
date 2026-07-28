// src/middlewares/errorHandler.ts
import type { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  console.error(`❌ [Error]: ${err.stack || err.message}`);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};