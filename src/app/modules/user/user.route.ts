import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';

import validataRequest from '../../middleware/validationSchemaRequest';
import { userValidation } from './user.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { FacultyValidations } from '../Faculty/faculty.validation';
import Auth from '../../middleware/Auth';
import { USER_ROLE } from './user.const';
import { upload } from '../../utilities/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-faculty',
  Auth('superAdmin', USER_ROLE.admin),
  validataRequest(FacultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
);
router.post(
  '/create-student',
  Auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },

  validataRequest(userValidation.userValidationSchema),
  userController.createStudent,
);
router.post(
  '/create-admin',
  Auth(USER_ROLE.superAdmin),
  validataRequest(createAdminValidationSchema),
  userController.createAdmin,
);

export const userRoute = router;
