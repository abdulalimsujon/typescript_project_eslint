import express from 'express';
import { AcademicDepartmentController } from './AcademicDepartment.controller';
import validataRequest from '../../middleware/validationSchemaRequest';
import { AcademicDepartmentValidation } from './AcademicDepartmentValidation';

const router = express.Router();

router.post(
  '/create-academicDepartment',
  validataRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);
router.get(
  '/all-AcademicDepartment',

  AcademicDepartmentController.AllAcademicDepartment,
);
router.get(
  '/single-AcademicDepartment/:id',

  AcademicDepartmentController.getSingleAcademicDepartemnt,
);
router.patch(
  '/update-AcademicDepartment/:id',
  validataRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),

  AcademicDepartmentController.updatedDepartment,
);

export const AcademicDepartmentRoute = router;
