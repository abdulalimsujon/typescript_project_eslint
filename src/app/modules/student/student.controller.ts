import { Request, Response } from 'express';
import { studentServices } from './student.service';
//import studentZodSchema from './student.zod.validation';
//import { studentValidationSchema } from './student.zod.validation';

import studentJoiSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;

    const { value, error } = studentJoiSchema.validate(student);

    // const ZodParseData = studentZodSchema.parse(student);

    const result = await studentServices.createStudentIntoDB(value);

    if (error) {
      res.status(400).json({
        success: true,
        message: 'somethings went wrong',
        error: error,
      });
    }

    res.status(200).json({
      success: true,
      message: 'student is create successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudent();
    res.status(200).json({
      success: true,
      message: 'students are retrived successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await studentServices.getSingleStudent(id);

  res.status(200).json({
    success: true,
    message: 'search is gotten successfully',
    data: result,
  });
};
export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
