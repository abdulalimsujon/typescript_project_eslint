/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { request, response } from 'express';
import { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { Application } from 'express';
import notFound from './app/middleware/notFound';
import { StudentRoute } from './app/modules/student/student.route';
import { userRoute } from './app/modules/user/user.route';
import { AcademicSemesterRoute } from './app/modules/AcademicSemester/AcademicSemester.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// app.use('api/v1', router);
app.use('/api/v1/students', StudentRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/academic-semesters', AcademicSemesterRoute);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
