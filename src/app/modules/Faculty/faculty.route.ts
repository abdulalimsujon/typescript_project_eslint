import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import validataRequest from '../../middleware/validationSchemaRequest';
import Auth from '../../middleware/Auth';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validataRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', Auth(USER_ROLE.student), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
