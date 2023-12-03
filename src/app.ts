import express from 'express';
import cors from 'cors';
import { Application } from 'express';
import { StudentRoute } from './app/modules/student/student.route';

const app: Application = express();

//const port = 3000

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1/students', StudentRoute);

export default app;
