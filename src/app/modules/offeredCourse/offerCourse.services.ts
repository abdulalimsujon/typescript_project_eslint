import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { AcademicSemesterRegistration } from '../SemesterRegistration/AcademicSemesterRegistration.model';
import { TofferedCourse } from './offerCourse.interface';
import { offerCourse } from './offerCourse.model';
import { AcademicDepartment } from '../AcademicDepartment/AcademicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../Faculty/Faculty.model';
import { AcademicFaculty } from '../AcademicFaculty/AcademicFaculty.model';
import { timeConflict } from './offerCourse.util';

const createOfferCourseIntoDb = async (payload: TofferedCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;
  const existSemesterRegistration =
    await AcademicSemesterRegistration.findById(semesterRegistration);
  if (!existSemesterRegistration) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      ' AcademicSemesterRegistration is not found 44',
    );
  }

  const existacademicDepartment =
    await AcademicDepartment.findById(academicDepartment);
  if (!existacademicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'AcademicDepartment is not found');
  }
  const isDepartmentBelongsToFaculty = await AcademicDepartment.findOne(
    { academicFaculty },
    { _id: academicDepartment },
  );
  if (!isDepartmentBelongsToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Academic department is not belongs to Academic Faculty',
    );
  }
  const isSameCourseOfferedInSameSemester = await offerCourse.findOne({
    semesterRegistration,
    course,
    section,
  });
  if (isSameCourseOfferedInSameSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Same course offered in same semester',
    );
  }
  const existacademicFaculty = await AcademicFaculty.findById(academicFaculty);
  if (!existacademicFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'offered course with same section is aready exists!!',
    );
  }
  const existCourse = await Course.findById(course);
  if (!existCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found');
  }
  const existFaculty = await Faculty.findById(faculty);
  if (!existFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'faculty is not found');
  }

  const assignedSchudules = await offerCourse
    .find({
      semesterRegistration,
      faculty,
      days: { $in: days },
      section,
    })
    .select('days startTime endTime');

  const newSchudules = {
    days,
    startTime,
    endTime,
  };

  if (timeConflict(newSchudules, assignedSchudules)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This faculty is not available in this time',
    );
  }

  const academicSemester = existSemesterRegistration?.academicSemester;
  const result = await offerCourse.create({ ...payload, academicSemester });

  return result;
};

export const offerCourseService = {
  createOfferCourseIntoDb,
};
