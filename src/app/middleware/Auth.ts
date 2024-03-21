import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utilities/catchAsync';
import AppError from '../Errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const Auth = (...RequireRules: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorize');
    }

    //if  the token is unvalid

    const decode = jwt.verify(
      token,
      config.jwtAcessToken as string,
    ) as JwtPayload;

    req.user = decode as JwtPayload;

    const { role, userId, iat } = decode;
    const user = await User.findOne({ id: userId });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'this user is not found');
    }

    const isDeleted = user.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'this user is alrady deleted');
    }

    const isBlocked = user.status;

    if (isBlocked === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'this user is blocked');
    }

    if (
      user?.PasswordChangeAt &&
      User.isJWTissuedBeforePasswordChanged(
        user.PasswordChangeAt,
        iat as number,
      )
    ) {
      console.log(
        User.isJWTissuedBeforePasswordChanged(
          user.PasswordChangeAt,
          iat as number,
        ),
      );
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorize');
    }
    if (RequireRules && !RequireRules.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorize');
    }

    next();
  });
};

export default Auth;
