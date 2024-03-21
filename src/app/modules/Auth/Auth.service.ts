import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './Auth.interface';

import Jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  const isUserExists = await User.findOne({ id: payload.id });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is not found');
  }

  const isDeleted = isUserExists.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is alrady deleted');
  }

  const isBlocked = isUserExists.status;

  if (isBlocked === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is blocked');
  }

  const user = await User.isPasswordMatched(
    payload?.password,
    isUserExists.password,
  );

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password doest match!');
  }

  const JwtPayload = {
    userId: isUserExists.id,
    role: isUserExists.role,
  };

  const token = Jwt.sign(JwtPayload, config.jwtAcessToken as string, {
    expiresIn: '365d',
  });

  return {
    accessToken: token,
    needPasswordChange: isUserExists.needPasswordChange,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const isUserExists = await User.findOne({ id: userData.userId });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is not found');
  }

  const isDeleted = isUserExists.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is alrady deleted');
  }

  const isBlocked = isUserExists.status;

  if (isBlocked === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is blocked');
  }

  const user = await User.isPasswordMatched(
    payload?.oldPassword,
    isUserExists.password,
  );

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.sult_round),
  );

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password doest match!');
  }
  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: hashedPassword,
      needPasswordChange: false,
      PasswordChangeAt: new Date(),
    },
  );

  return null;
};
export const authServices = {
  loginUser,
  changePassword,
};
