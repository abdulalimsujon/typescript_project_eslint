import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utilities/catchAsync';
import AppError from '../Errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';

const Auth = (...RequireRules: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorize');
    }

    //if  the token is unvalid

    jwt.verify(token, config.jwtAcessToken as string, function (error, decode) {
      if (error) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorize');
      }
      req.user = decode as JwtPayload;

      const role = (decode as JwtPayload)?.role;

      if (RequireRules && RequireRules.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorize');
      }
    });

    next();
  });
};

export default Auth;
