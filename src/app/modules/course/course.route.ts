import express from 'express';
import validataRequest from '../../middleware/validationSchemaRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validataRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/:id', CourseControllers.getSingleCourse);

router.patch(
  '/:id',
  validataRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete('/:id', CourseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',

  validataRequest(CourseValidations.AssignFacultiesWithCourseValidationSchema),

  CourseControllers.assignFacultyIntoWithCourse,
);
router.put(
  '/:courseId/remove-faculties',

  validataRequest(CourseValidations.AssignFacultiesWithCourseValidationSchema),

  CourseControllers.removeFacultyIntoWithCourse,
);

router.get(
  '/:id/getCourse-faculties',
  CourseControllers.getFacultiesWithCourse,
);

// router.delete(
//   '/:courseId/remove-faculties',
//   validataRequest(CourseValidations.facultiesWithCourseValidationSchema),
//   CourseControllers.removeFacultiesFromCourse,
// );

router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;
