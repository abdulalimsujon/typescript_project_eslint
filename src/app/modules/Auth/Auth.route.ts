import express from 'express';
import validataRequest from '../../middleware/validationSchemaRequest';
import { AuthenticationValidation } from './Auth.Validation';
import { AuthController } from './Auth.controller';
const router = express.Router();

router.post(
  '/login',
  validataRequest(AuthenticationValidation.loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRoute = router;
