/* eslint-disable @typescript-eslint/no-explicit-any */
import { TAcademicSemester } from '../AcademicSemester/AcademicSemester.interface';
import { User } from './user.model';

const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: -1,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generatedStudentId = async (payload: TAcademicSemester | any) => {
  let currentId: string | any = (0).toString();

  const lastStudentId = await findLastStudent();

  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastSemesterStudentYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload?.code;
  const currentSemesterYear = payload?.year;

  if (
    lastStudentSemesterCode == currentSemesterCode &&
    lastSemesterStudentYear == currentSemesterYear
  ) {
    currentId = lastStudentId?.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`.toString();

  console.log('increment id', incrementId);

  return incrementId;
};
