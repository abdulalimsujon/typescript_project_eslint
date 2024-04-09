import express from 'express';
import validataRequest from '../../middleware/validationSchemaRequest';
import { enrolledCoursevalidation } from './EnrolledCourseValidation';
import { enrollCourseController } from './EntrollCourseController';
import Auth from '../../middleware/Auth';
const router = express.Router();

router.post(
  '/create-enroll-course',
  Auth('student'),
  validataRequest(enrolledCoursevalidation.CreateEnrollCourseValidation),
  enrollCourseController.createEnrollCourse,
);

router.patch(
  '/update-enroll-course-marks',
  Auth('faculty'),
  validataRequest(enrolledCoursevalidation.enrollCourseValidationMark),
  enrollCourseController.updateCourseMarksIntoDb,
);

export const entrollCourseRoutes = router;
