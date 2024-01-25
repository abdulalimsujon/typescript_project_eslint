import { Student } from './student.model';

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

//------------------------------add userOder----------------------------------->

export const studentServices = {
  getAllStudent,
  getSingleStudent,
  DeleteStudentFromDb,
};
