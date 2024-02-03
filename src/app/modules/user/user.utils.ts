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

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generatedStudentId = async (payload: TAcademicSemester | any) => {
  const currentId = (await findLastStudent()) || (0).toString();

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`.toString();

  return incrementId;
};
