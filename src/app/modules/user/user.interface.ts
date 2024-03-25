/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.const';

export interface TUser {
  id: string;
  email: string;
  password: string;
  needPasswordChange: boolean;
  PasswordChangeAt: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  //here is the function definition

  isUserExistByCustomId(id: string): Promise<TUser>;

  isPasswordMatched(
    planeTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTissuedBeforePasswordChanged(
    passwordChangeTimeStamps: Date,
    jwtIssuedTimeStamps: number,
  ): boolean;
}
export type TUserRole = keyof typeof USER_ROLE;
