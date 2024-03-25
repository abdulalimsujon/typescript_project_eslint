import express from 'express';
import validataRequest from '../../middleware/validationSchemaRequest';
import { AuthenticationValidation } from './Auth.Validation';
import { AuthController } from './Auth.controller';
import Auth from '../../middleware/Auth';
import { USER_ROLE } from '../user/user.const';
const router = express.Router();

router.post(
  '/login',
  validataRequest(AuthenticationValidation.loginValidationSchema),
  AuthController.loginUser,
);
router.post(
  '/change-password',
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validataRequest(AuthenticationValidation.changePasswordValidationSchema),
  AuthController.changePassword,
);
router.post(
  '/refreshToken',
  validataRequest(AuthenticationValidation.refreshTokenValidation),
  AuthController.refreshToken,
);

router.post(
  '/forget-password',
  validataRequest(AuthenticationValidation.forgetPasswordValidation),
  AuthController.forgetPassword,
);
router.patch(
  '/reset-password',
  validataRequest(AuthenticationValidation.resetPasswordValidationSchema),
  AuthController.resetPassword,
);
router.patch(
  '/change-status/:id',
  Auth('admin'),
  validataRequest(AuthenticationValidation.changeStatusValidation),
  AuthController.changeStatus,
);
router.get('/getMe', Auth('student', 'admin', 'faculty'), AuthController.getMe);

export const AuthRoute = router;
