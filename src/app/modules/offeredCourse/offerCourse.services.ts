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
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from '../course/course.const';
import { Student } from '../student/student.model';

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

const updateOfferCourseIntoDb = async (
  id: string,
  payload: Pick<TofferedCourse, 'faculty' | 'startTime' | 'endTime' | 'days'>,
) => {
  const { faculty, days, endTime, startTime } = payload;
  const isOfferCourseExists = await offerCourse.findById(id);
  const semesterRegistration = isOfferCourseExists?.semesterRegistration;
  const semesterRegistratioCourseStatus =
    await AcademicSemesterRegistration.findById(semesterRegistration);

  if (semesterRegistratioCourseStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you cannot update this course due to ${semesterRegistratioCourseStatus?.status}`,
    );
  }

  if (!isOfferCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This course has no existance');
  }
  const assignedSchudules = await offerCourse
    .find({
      semesterRegistration,
      faculty,
      days: { $in: days },
    })
    .select('days startTime endTime');

  const newSchudules = {
    days,
    startTime,
    endTime,
  };

  const isFacultyExists = await Faculty.findById(faculty);

  if (isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This faculty has no existance');
  }

  if (timeConflict(newSchudules, assignedSchudules)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This faculty is not available in this time',
    );
  }

  const result = await offerCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const getAllOfferCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    offerCourse.find().populate('course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();

  return { result, meta };
};

const myOfferedCourse = async (id: string) => {
  const student = await Student.findOne({ id: id });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found ');
  }

  const currentOngoingSemester = await AcademicSemesterRegistration.findOne({
    status: 'ONGOING',
  });

  if (!currentOngoingSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'There are no semester ongoging');
  }

  const result = await offerCourse.aggregate([
    {
      $match: {
        semesterRegistration: currentOngoingSemester?._id,
        academicDepartment: student.academicDepartment,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $lookup: {
        from: 'enrollcourses',
        let: { currentOngoingSemester: currentOngoingSemester._id },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$semesterRegistration', '$$currentOngoingSemester'],
                  },
                  { $eq: ['$student', student._id] },
                  { $eq: ['$isEnrolled', true] },
                ],
              },
            },
          },
        ],
        as: 'enrolledCourse',
      },
    },

    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $lookup: {
        from: 'enrollcourses',
        let: {},
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$student', student._id],
                  },
                  {
                    $eq: ['$isCompleted', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'completedCourses',
      },
    },
    {
      $addFields: {
        isAlreadyEnrolled: {
          $in: [
            '$course._id',
            {
              $map: {
                input: '$enrolledCourse',
                as: 'enroll',
                in: '$$enroll.course',
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
      },
    },
  ]);

  return {
    result,
  };
};

export const offerCourseService = {
  createOfferCourseIntoDb,
  updateOfferCourseIntoDb,
  getAllOfferCoursesFromDB,
  myOfferedCourse,
};
