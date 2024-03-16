import express from 'express';
import { offerCourseController } from './offerCourse.controller';
import validataRequest from '../../middleware/validationSchemaRequest';
import { offerCourseValidation } from './offerCourseValidation';

const router = express.Router();

router.post(
  '/create',
  validataRequest(offerCourseValidation.offerCourseValidationSchema),
  offerCourseController.createOffercourse,
);
export const offeredCourse = router;
