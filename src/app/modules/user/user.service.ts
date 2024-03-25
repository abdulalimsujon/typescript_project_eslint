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
import { Express } from 'express';
import {
  generateAdminId,
  generatedFacultyId,
  generatedStudentId,
} from './user.utils';

import { TFaculty } from '../Faculty/Faculty.schema';
import { Faculty } from '../Faculty/Faculty.model';
import { Admin } from '../admin/admin.model';
import { sendImageToCloudinary } from '../../utilities/sendImageToCloudinary';

const createStudentIntoDB = async (
  file: Express.Multer.File & { path?: string },
  password: string,
  payload: TStudent,
) => {
  const userData: Partial<TUser> = {};
  userData.role = 'student';
  userData.email = payload?.email;
  userData.password = password || (config.defaultPassword as string);

  const admissionSemesterInfo = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generatedStudentId(admissionSemesterInfo);

    const imageName = `${userData.id} ${payload.name.firstName}`;
    const path = file?.path;
    const { secure_url } = (await sendImageToCloudinary(imageName, path)) as {
      secure_url: string;
    };

    const newUser = await User.create([userData], { session }); // array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImage = secure_url ?? '';

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
  userData.email = payload?.email;
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
const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password

  userData.password = password || (config.defaultPassword as string);

  //set student role
  userData.role = 'admin';
  userData.email = payload?.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();
    userData.email = payload?.email;

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  createStudentIntoDB,
  CreateFacultyIntoDB,
  createAdminIntoDB,
};
