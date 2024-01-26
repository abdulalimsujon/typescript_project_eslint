/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { request, response } from 'express';
import { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { Application } from 'express';
import { StudentRoute } from './app/modules/student/student.route';
import { userRoute } from './app/modules/user/user.route';
import errorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('api/v1', router);

app.use(errorHandler);
app.use(notFound);

export default app;
