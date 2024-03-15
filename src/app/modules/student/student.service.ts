import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchAbleQuery } from './student.const';

const getAllStudent = async (query: Record<string, unknown>) => {
  // let searchTerm = '';
  // const queryObject = { ...query };

  // console.log(query);

  // const excludedFields = ['email', 'sort', 'limit', 'page', 'fields'];

  // excludedFields.forEach((ele) => delete queryObject[ele]);

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchAbleQuery = ['email', 'name.firstName', 'presentAddress'];
  // const searchQuery = Student.find({
  //   $or: searchAbleQuery.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // return searchQuery;

  // let sort = '-createdAt';

  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const filterQuery = searchQuery
  //   .find(queryObject)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //     });
  // const sortQuery = filterQuery.sort(sort);
  // let page = 1;
  // let skip = 0;
  // let limit = 1;
  // if (query.limit) {
  //   limit = query.limit as number;
  // }
  // if (query.page) {
  //   page = query.page as number;
  //   skip = (page - 1) * limit;
  // }

  // const limitQuery = sortQuery.limit(limit);

  // const paginationQuery = limitQuery.skip(skip);

  // let fields = ' ';

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }
  // const filedsQuery = await paginationQuery.select(fields);
  // return filedsQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(searchAbleQuery)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
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
