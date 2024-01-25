import { Request, Response } from 'express';
import { userServices } from './user.service';
import { TStudent } from '../student/student.interface';

const createStudent = async (req: Request, res: Response) => {
  // try {
  const { password, student } = req.body;

  //console.log(password, student);

  // const { value, error } = studentJoiSchema.validate(student);

  // const ZodParseData = studentZodSchema.parse(student);

  const result = await userServices.createStudentIntoDB(password, student);

  // if (error) {
  //   res.status(400).json({
  //     success: true,
  //     message: 'somethings went wrong',
  //     // error: error,
  //   });
  // }

  res.status(200).json({
    success: true,
    message: 'student is create successfully',
    data: result,
  });
  // } catch (error: any) {
  //   res.status(500).json({
  //     success: false,
  //     message: error.message || 'something went wrong',
  //     // error: error,
  //   });
};
// };

export const userController = {
  createStudent,
};
