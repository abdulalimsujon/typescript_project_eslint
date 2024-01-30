import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';

const createStudentIntoDB = async (password: string, StudentData: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.role = 'student';
  userData.id = '34345345';

  userData.password = password || (config.defaultPassword as string);

  // const newUser = new User(userData);

  // const result = await newUser.save();

  // if (Object.keys(result)) {
  //   StudentData.id = result.id;
  //   StudentData.user = result._id;
  // }

  const newStudent = await Student.create(StudentData);

  return newStudent;
};

export const userServices = {
  createStudentIntoDB,
};
