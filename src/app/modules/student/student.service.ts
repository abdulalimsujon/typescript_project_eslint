import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudent = async (query: Record<string, unknown>) => {
  let searchTerm = '';

  const queryObject = { ...query };

  const excludedFields = ['email', 'sort', 'limit'];

  excludedFields.forEach((ele) => delete queryObject[ele]);

  if (query.queryTerm) {
    searchTerm = query?.queryTerm as string;
  }
  const searchAbleQuery = ['email', 'name.firstName', 'presentAddress'];
  const searchQuery = Student.find({
    $or: searchAbleQuery.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  let sort = '-createdAt';

  if (query.sort) {
    sort = query.sort as string;
  }
  const filterQuery = searchQuery
    .find(queryObject)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  if (query.limit) {
    limit = query.limit as number;
  }

  const result = await sortQuery.limit(limit);
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id });

  return result;
};
const updateStudentFromDb = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.updateOne({ id: id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const DeleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete student');
    }
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete student');
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const studentServices = {
  getAllStudent,
  getSingleStudent,
  DeleteStudentFromDb,
  updateStudentFromDb,
};
