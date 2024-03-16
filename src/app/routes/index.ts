import express from 'express';
import { StudentRoute } from '../modules/student/student.route';
import { userRoute } from '../modules/user/user.route';
import { AcademicSemesterRoute } from '../modules/AcademicSemester/AcademicSemester.route';
import { AcademicDepartmentRoute } from '../modules/AcademicDepartment/AcademicDepartment.route';
import { CourseRoutes } from '../modules/course/course.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AcademicSemesterRegistrationRoute } from '../modules/SemesterRegistration/AcademicSemesterRegistration.routes';
import { AcademicFacultyRoute } from '../modules/AcademicFaculty/AcademicFaculty.route';
import { offeredCourse } from '../modules/offeredCourse/offeredCourse.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/offered-course',
    route: offeredCourse,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/academic-semester-registration',
    route: AcademicSemesterRegistrationRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
