import express from 'express';
import { StudentRoute } from '../modules/student/student.route';
import { userRoute } from '../modules/user/user.route';
import { AcademicSemesterRoute } from '../modules/AcademicSemester/AcademicSemester.route';
import { AcademicFacultyRoute } from '../modules/AcademicFaculty/AcademicFaculty.route';
import { AcademicDepartmentRoute } from '../modules/AcademicDepartment/AcademicDepartment.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/students',
    route: StudentRoute,
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
    path: '/academic-faculty',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
