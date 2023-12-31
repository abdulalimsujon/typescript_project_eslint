import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (StudentData: TStudent) => {
  // const result = await Student.create(Student);

  const student = new Student(StudentData);

  if (await Student.isUserExists(StudentData.id)) {
    throw new Error('user already exist');
  }

  //   if (await student.isUserExist(StudentData.id)) {
  //     throw new Error('User already exists');
  //   }

  const result = await student.save();

  return result;
};

const getAllStudent = async () => {
  const result = await Student.find();

  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.find({ id });

  return result;
};
const DeleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });

  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudent,
  getSingleStudent,
  DeleteStudentFromDb,
};
