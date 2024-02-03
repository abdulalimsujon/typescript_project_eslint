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
router.get('/getAll-semester', AcademicSemesterController.AllSemester);
router.patch(
  '/update-academic-semester/:id',
  validataRequest(
    AcademicSemesterValidation.updateAcademicSemesterSchemaValidation,
  ),
  AcademicSemesterController.updatedSemster,
);
router.get(
  '/getSingle-academic-semester/:id',
  AcademicSemesterController.getSingleSemester,
);
export const AcademicSemesterRoute = router;
