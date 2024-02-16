import { Schema, model } from 'mongoose';

import {
  TCourseFaculty,
  Tcourse,
  preRequisiteCourse,
} from './course.interface';

const preRequisiteCourseSchema = new Schema<preRequisiteCourse>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<Tcourse>({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCourseSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Course = model<Tcourse>('course', courseSchema);

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);
