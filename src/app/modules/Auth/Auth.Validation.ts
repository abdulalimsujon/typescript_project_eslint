import { z } from 'zod';
import { USER_STATUS } from '../user/user.const';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'id is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password  is required' }),
    newPassword: z.string({ required_error: 'password is required' }),
  }),
});

const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'refresh token is required' }),
  }),
});
const forgetPasswordValidation = z.object({
  body: z.object({
    id: z.string(),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'userId is required',
    }),
    newPassword: z.string({
      required_error: 'new password is required',
    }),
  }),
});

const changeStatusValidation = z.object({
  body: z.object({
    status: z.enum([...USER_STATUS] as [string, ...string[]]),
  }),
});
export const AuthenticationValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidation,
  forgetPasswordValidation,
  resetPasswordValidationSchema,
  changeStatusValidation,
};
