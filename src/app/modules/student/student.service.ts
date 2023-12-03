import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (Student: Student) => {
  const result = await StudentModel.create(Student);

  return result;
};
const getAllStudent = async () => {
  const result = await StudentModel.find();

  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await StudentModel.find({ id });

  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudent,
  getSingleStudent,
};
