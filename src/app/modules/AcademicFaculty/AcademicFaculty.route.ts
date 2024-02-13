import express from 'express';
import { AcademicFacultyController } from './AcademicFaculty.controller';
import validataRequest from '../../middleware/validationSchemaRequest';
import { AcademicFacultyValidation } from './AcademicFaculty.validation';

const router = express.Router();

router.get('/all-faculty', AcademicFacultyController.AllFaculty);
router.patch(
  '/update-faculty/:id',
  AcademicFacultyController.updatedFaculty,
  validataRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
);
router.get(
  '/single-faculty/:id',
  AcademicFacultyController.getSingleAcademicFaculty,
);

export const AcademicFacultyRoute = router;
