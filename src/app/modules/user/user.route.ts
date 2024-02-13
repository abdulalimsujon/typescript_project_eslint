import express from 'express';
import { userController } from './user.controller';

import validataRequest from '../../middleware/validationSchemaRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validataRequest(userValidation.userValidationSchema),
  userController.createFaculty,
);
router.post(
  '/create-student',
  validataRequest(userValidation.userValidationSchema),
  userController.createStudent,
);

export const userRoute = router;
