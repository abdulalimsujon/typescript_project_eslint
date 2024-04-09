import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { TEnrolledCourse } from './EnrollCourse.interface';
import { EnrollCourse } from './Enrollcourses.model';
import { offerCourse as offeredCourse } from '../offeredCourse/offerCourse.model';
import { Student } from '../student/student.model';
import mongoose from 'mongoose';
import { AcademicSemesterRegistration } from '../SemesterRegistration/AcademicSemesterRegistration.model';
import { Course } from '../course/course.model';
import { Faculty } from '../Faculty/Faculty.model';
import { gradePointCalculation } from './entrollCourse.utils';

const createEnrollCourse = async (userId: string, payload: TEnrolledCourse) => {
  const { offerCourse } = payload;

  const isOffercourseExist = await offeredCourse.findById({ _id: offerCourse });

  const course = await Course.findById(isOffercourseExist?.course);

  if (!isOffercourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'this offer course is not found ');
  }

  const student = await Student.findOne({ id: userId }, { _id: 1 });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'the student is not found');
  }

  const isStudentAlreadyEntrolled = await EnrollCourse.findOne({
    semesterRegistration: isOffercourseExist?.semesterRegistration,
    offerCourse,
    student: student?._id,
  });

  const semsterRegistationMaxCredit =
    await AcademicSemesterRegistration.findById(
      isOffercourseExist.semesterRegistration,
    ).select('maxCredit');

  const enrollCourse = await EnrollCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOffercourseExist?.semesterRegistration,
        student: student?._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'EntrollCourseData',
      },
    },
    {
      $unwind: '$EntrollCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrollCredits: { $sum: '$EntrollCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrollCredits: 1,
      },
    },
  ]);

  const totalCredit = enrollCourse.length > 0 ? enrollCourse[0].credits : 0;

  if (
    totalCredit &&
    semsterRegistationMaxCredit &&
    totalCredit + course?.credits > semsterRegistationMaxCredit
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'you have exceeded maximum number of credits',
    );
  }

  if (isStudentAlreadyEntrolled) {
    throw new AppError(httpStatus.CONFLICT, 'course is already enrolled');
  }

  if (isOffercourseExist.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Max capacity is extended');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await EnrollCourse.create(
      [
        {
          semesterRegistration: isOffercourseExist.semesterRegistration,
          academicSemester: isOffercourseExist.academicSemester,
          academicFaculty: isOffercourseExist.academicFaculty,
          academicDepartment: isOffercourseExist.academicDepartment,
          offerCourse: offerCourse,
          isEnrolled: true,
          course: isOffercourseExist.course,
          student: student?._id,
          faculty: isOffercourseExist.faculty,
        },
      ],
      { session },
    );
    const maxCapacity = isOffercourseExist.maxCapacity;

    await offeredCourse.findByIdAndUpdate(offerCourse, {
      maxCapacity: maxCapacity - 1,
    });

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'failed to enrolled the course',
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};
const updateCourseMarksIntoDb = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offerCourse, student, courseMarks } = payload;

  const isSemesterExist = await AcademicSemesterRegistration.findById({
    _id: semesterRegistration,
  });
  if (!isSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'this semesterRegistration  is not found ',
    );
  }

  const isOffercourseExist = await offeredCourse.findById({ _id: offerCourse });

  if (!isOffercourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'this offer course is not found ');
  }

  const studentExist = await Student.findOne({ _id: student }, { _id: 1 });
  if (!studentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'the student is not found111');
  }
  const facultyMongoId = await Faculty.findOne({ id: facultyId }, { _id: 1 });

  const isCourseBelongSToFaculty = await EnrollCourse.findOne({
    semesterRegistration,
    offerCourse,
    student,

    faculty: facultyMongoId,
  });

  if (!isCourseBelongSToFaculty) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'this faculty is not able to update this mark',
    );
  }

  const modifyData: Record<string, unknown> = {
    ...courseMarks,
  };

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifyData[`courseMarks.${key}`] = value;
    }
  }

  if (isCourseBelongSToFaculty.courseMarks?.finalExam) {
    const { classTest1, classTest2, midtermExam, finalExam } =
      isCourseBelongSToFaculty.courseMarks;

    const totalMarks =
      Math.ceil(classTest1) +
      Math.ceil(classTest2) +
      Math.ceil(midtermExam) +
      Math.ceil(finalExam);

    const result = gradePointCalculation(totalMarks);

    modifyData.grade = result.grade;
    modifyData.isCompleted = true;
    modifyData.gradePoints = result.gradePoints;
  }

  const result = await EnrollCourse.findByIdAndUpdate(
    isCourseBelongSToFaculty._id,
    modifyData,
    {
      new: true,
    },
  );

  return result;
};
export const enrollCourseServices = {
  createEnrollCourse,
  updateCourseMarksIntoDb,
};
