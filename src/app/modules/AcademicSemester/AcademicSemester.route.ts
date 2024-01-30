import express from 'express';
import { AcademicSemesterController } from './AcademicSemester.controller';
import validataRequest from '../../middleware/validationSchemaRequest';
import { AcademicSemesterValidation } from './AcademicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validataRequest(
    AcademicSemesterValidation.CreateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRoute = router;
