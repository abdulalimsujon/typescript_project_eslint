import express from 'express';
import { offerCourseController } from './offerCourse.controller';
import validataRequest from '../../middleware/validationSchemaRequest';
import { offerCourseValidation } from './offerCourseValidation';
import Auth from '../../middleware/Auth';
import { USER_ROLE } from '../user/user.const';

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

router.get(
  '/my-offered-courses',
  Auth(USER_ROLE.student),
  offerCourseController.myOfferedCourse,
);

router.get('/getAll-offer-courses', offerCourseController.getAllOfferedCourses);
export const offeredCourse = router;
