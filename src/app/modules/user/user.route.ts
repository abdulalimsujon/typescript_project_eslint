import express from 'express';
import { userController } from './user.controller';

import validataRequest from '../../middleware/validationSchemaRequest';
import { userValidation } from './user.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { FacultyValidations } from '../Faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validataRequest(FacultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
);
router.post(
  '/create-student',
  validataRequest(userValidation.userValidationSchema),
  userController.createStudent,
);
router.post(
  '/create-admin',
  validataRequest(createAdminValidationSchema),
  userController.createAdmin,
);

export const userRoute = router;
