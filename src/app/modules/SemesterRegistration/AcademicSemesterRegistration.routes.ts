import express from 'express';

import { AcademicSemesterRegistrationController } from './AcademicSemesterRegistration.Controller';
import { AcademicSemesterRegistrationValidations } from './SemesterRegistration.validation';
import validataRequest from '../../middleware/validationSchemaRequest';

const router = express.Router();

router.post(
  '/create',
  validataRequest(
    AcademicSemesterRegistrationValidations.createSmesterRegistrationValidationSchema,
  ),
  AcademicSemesterRegistrationController.CreateSemesterRegistration,
);
router.patch(
  '/update-semester-registration/:id',
  validataRequest(
    AcademicSemesterRegistrationValidations.updateSmesterRegistrationValidationSchema,
  ),
  AcademicSemesterRegistrationController.updateRegistrationSemester,
);
router.get(
  '/get-academic-register-semester',

  AcademicSemesterRegistrationController.getAllRegisterCourse,
);

export const AcademicSemesterRegistrationRoute = router;
