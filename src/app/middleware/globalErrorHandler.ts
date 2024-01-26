/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const msg = error.message || 'something went wrong';

  res.json(statusCode).json({
    success: false,
    message: msg,
    error: error.message,
  });

  return res;
};

export default errorHandler;
