import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './Auth.interface';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';
import createToken from './Auth.utils';

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

  const accessToken = createToken(
    JwtPayload,
    config.jwtAcessToken as string,
    '7d',
  );
  const refreshToken = createToken(
    JwtPayload,
    config.refreshAccessToken as string,
    '1y',
  );

  return {
    accessToken: accessToken,
    refreshToken,
    needPasswordChange: isUserExists?.needPasswordChange,
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

const refreshToken = async (token: string) => {
  const decode = jwt.verify(
    token,
    config.refreshAccessToken as string,
  ) as JwtPayload;

  const { userId, iat } = decode;

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
    User.isJWTissuedBeforePasswordChanged(user.PasswordChangeAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorize');
  }

  const JwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    JwtPayload,
    config.jwtAcessToken as string,
    '7d',
  );

  return accessToken;
};
export const authServices = {
  loginUser,
  refreshToken,
  changePassword,
};
