import express from 'express';
import { StudentRoute } from '../modules/student/student.route';
import { userRoute } from '../modules/user/user.route';

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
];

moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;
