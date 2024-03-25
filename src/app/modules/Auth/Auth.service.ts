import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './Auth.interface';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';

import { sendEmail } from '../../utilities/sendEmail';
import { createToken } from './Auth.utils';
import { Student } from '../student/student.model';
import { Admin } from '../admin/admin.model';
import { Faculty } from '../Faculty/Faculty.model';

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

const forgetPassword = async (userId: string) => {
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

  const JwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    JwtPayload,
    config.jwtAcessToken as string,
    '10min',
  );

  const resetUiLink = `${config.reset_password_link}?id=${user.id}&token=${resetToken}`;

  sendEmail(user.email, resetUiLink);
};
const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.findOne({ id: payload.id });

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
  const decode = jwt.verify(
    token,
    config.jwtAcessToken as string,
  ) as JwtPayload;

  if (payload?.id !== decode.userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden');
  }

  const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

  await User.findOneAndUpdate(
    {
      id: decode.id,
      role: decode.role,
    },
    {
      password: hashedPassword,
      needPasswordChange: false,
      PasswordChangeAt: new Date(),
    },
  );
};

const getMe = async (id: string, role: string) => {
  let result = null;

  if (role === 'student') {
    result = await Student.findOne({ id: id }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id }).populate('user');
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id }).populate('user');
  }

  return result;
};

const changeStatus = async (id: string, status: string) => {
  const result = await User.findOneAndUpdate(
    { id },
    { status },
    {
      new: true,
    },
  );
  return result;
};
export const authServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
  getMe,
  changeStatus,
};
