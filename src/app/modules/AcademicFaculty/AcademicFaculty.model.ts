import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './AcademicFaculty.interface';

const AcademicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  AcademicFacultySchema,
);
