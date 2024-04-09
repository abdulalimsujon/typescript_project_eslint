import { Schema, model } from 'mongoose';
import {
  TEnrolledCourse,
  TEnrolledCoursecourseMark,
} from './EnrollCourse.interface';
import { grade } from './enrollCourseConst';

const courseMarksSchema = new Schema<TEnrolledCoursecourseMark>({
  classTest1: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  classTest2: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  midtermExam: {
    type: Number,
    min: 0,
    max: 30,
    default: 0,
  },
  finalExam: {
    type: Number,
    min: 0,
    max: 50,
    default: 0,
  },
});

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemesterRegistration',
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'CourseFaculty',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemesterRegistration',
  },
  offerCourse: {
    type: Schema.Types.ObjectId,
    ref: 'offerCourse',
    required: true,
  },

  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },

  isEnrolled: {
    type: Boolean,
    default: false,
  },
  courseMarks: {
    type: courseMarksSchema,
  },
  grade: {
    type: String,
    enum: grade,
    default: 'NA',
  },
  gradePoints: {
    type: Number,
    max: 4,
    min: 0,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export const EnrollCourse = model<TEnrolledCourse>(
  'EnrollCourse',
  enrolledCourseSchema,
);
