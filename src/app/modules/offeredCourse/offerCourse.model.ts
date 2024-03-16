import mongoose, { model } from 'mongoose';
import { TofferedCourse } from './offerCourse.interface';
import { Schema } from 'mongoose';

const offeredCourseSchema = new mongoose.Schema<TofferedCourse>(
  {
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
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
    },
    days: [],
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const offerCourse = model<TofferedCourse>(
  'offerCourse',
  offeredCourseSchema,
);
