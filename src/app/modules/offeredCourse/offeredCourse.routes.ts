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
router.patch(
  '/update/:id',
  validataRequest(offerCourseValidation.UpdateOfferCourseValidationSchema),
  offerCourseController.updateOfferCourse,
);
export const offeredCourse = router;
