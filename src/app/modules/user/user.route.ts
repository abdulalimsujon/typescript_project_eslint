import express from 'express';
import { userController } from './user.controller';
import { studentZodSchema } from '../student/student.zod.validation';
import validataRequest from '../../middleware/validationSchemaRequest';

const router = express.Router();

router.post(
  '/create-student',
  validataRequest(studentZodSchema),
  userController.createStudent,
);

export const userRoute = router;
