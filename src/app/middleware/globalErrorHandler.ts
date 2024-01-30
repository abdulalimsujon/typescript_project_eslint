/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const msg = error.message || 'something went wrong';

  return res.status(statusCode).json({
    success: false,
    message: msg,
    error: error,
  });
};

export default globalErrorHandler;
