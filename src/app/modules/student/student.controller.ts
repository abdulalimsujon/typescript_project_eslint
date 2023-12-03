import { Request, Response } from 'express';
import { studentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;

    const result = studentServices.createStudentIntoDB(student);

    res.status(200).json({
      success: true,
      message: ' student is create successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  const result = await studentServices.getAllStudent();
  res.status(200).json({
    success: true,
    message: ' students are retrived successfully',
    data: result,
  });
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
