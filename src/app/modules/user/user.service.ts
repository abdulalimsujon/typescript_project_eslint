/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';
import { AcademicSemester } from '../AcademicSemester/AcademicSemester.model';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { Student } from '../student/student.model';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { generatedFacultyId, generatedStudentId } from './user.utils';

import { TFaculty } from '../Faculty/Faculty.schema';
import { Faculty } from '../Faculty/Faculty.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.role = 'student';
  userData.password = password || (config.defaultPassword as string);

  const admissionSemesterInfo = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generatedStudentId(admissionSemesterInfo);

    const newUser = await User.create([userData], { session }); // array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const CreateFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.role = 'faculty';
  userData.password = password || (config.defaultPassword as string);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generatedFacultyId();
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not created');
    }

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    await Faculty.create([payload], { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const userServices = {
  createStudentIntoDB,
  CreateFacultyIntoDB,
};
