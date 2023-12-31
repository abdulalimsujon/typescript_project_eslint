import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentController.createStudent);
router.get('/getAllStudent', StudentController.getAllStudent);
router.get('/getSingleStudent/:id', StudentController.getSingleStudent);
router.delete('/deleteStudent/:id', StudentController.DeleteStudent);

export const StudentRoute = router;
