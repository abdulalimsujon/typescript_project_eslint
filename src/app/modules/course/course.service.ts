import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';

import { CourseSearchableFields } from './course.const';

import { TCourseFaculty, Tcourse } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: Tcourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<Tcourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to update new course');
    }
    //check if there is any preRequisite course to update

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisites = preRequisiteCourses
        .filter((e) => e.course && e.isDeleted)
        .map((e) => e.course);

      const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPreRequisitesCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete course');
      }

      const newPreRequisiteCourse = preRequisiteCourses.filter(
        (e) => e.course && !e.isDeleted,
      );

      const newPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisiteCourse } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newPreRequisitesCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to add new courses');
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id);
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const facalty = payload.faculties;
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: facalty } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};
const removeFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const facalty = payload.faculties;
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: facalty } },
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  removeFacultiesWithCourseIntoDB,
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
};
