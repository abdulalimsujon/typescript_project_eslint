/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { request, response } from 'express';
import cors from 'cors';
import { Application } from 'express';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
