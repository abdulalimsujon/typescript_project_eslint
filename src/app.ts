/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from 'express';
import cors from 'cors';
import { Application } from 'express';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
};

app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
function async(arg0: (req: Request, res: Response) => void) {
  throw new Error('Function not implemented.');
}
