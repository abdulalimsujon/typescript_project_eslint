import config from '../../config';
import { AcademicSemester } from '../AcademicSemester/AcademicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';
// import { generatedStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.role = 'student';
  userData.password = password || (config.defaultPassword as string);

  // generated student id

  const admissionSemesterInfo = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (admissionSemesterInfo) {
    const genId = await generatedStudentId(admissionSemesterInfo);
    userData.id = genId;
  }

  const newUser = new User(userData);

  const result = await newUser.save();

  if (Object.keys(result)) {
    payload.id = result.id;
    payload.user = result._id;
  }

  const newStudent = await Student.create(payload);

  return newStudent;
};

export const userServices = {
  createStudentIntoDB,
};
