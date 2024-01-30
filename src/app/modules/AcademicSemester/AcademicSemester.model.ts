import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './AcademicSemester.interface';
import { code, months, semesterName } from './AcademicSemester.const';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: semesterName,
    },
    code: {
      type: String,
      require: true,
      enum: code,
    },
    year: String,
    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  {},
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);
