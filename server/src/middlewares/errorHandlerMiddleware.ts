import { NextFunction, Request, Response } from 'express';
import CustomError from '../models/CustomError';

const errorHandler = (
  error: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = error instanceof CustomError ? error.statusCode : 500;
  const message = error.message || 'An error occurred';
  res.status(statusCode).json({
    statusCode,
    message
  });
};

export default errorHandler;
