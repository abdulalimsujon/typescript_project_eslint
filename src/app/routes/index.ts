import express from 'express';
import { StudentRoute } from '../modules/student/student.route';
import { userRoute } from '../modules/user/user.route';
import { AcademicSemesterRoute } from '../modules/AcademicSemester/AcademicSemester.route';
import { AcademicDepartmentRoute } from '../modules/AcademicDepartment/AcademicDepartment.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';

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
    path: '/academic-department',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
