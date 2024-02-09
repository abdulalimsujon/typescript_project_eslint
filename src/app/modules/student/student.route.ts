import express from 'express';
import { StudentController } from './student.controller';
import validataRequest from '../../middleware/validationSchemaRequest';
import { studentValidation } from './student.zod.validation';

const router = express.Router();

router.get('/getAllStudent', StudentController.getAllStudent);
router.patch(
  '/updateStudent/:studentId',
  validataRequest(studentValidation.updateStudentZodSchema),
  StudentController.updateStudent,
);
router.get('/getSingleStudent/:studentId', StudentController.getSingleStudent);
router.delete('/deleteStudent/:studentId', StudentController.DeleteStudent);

export const StudentRoute = router;
