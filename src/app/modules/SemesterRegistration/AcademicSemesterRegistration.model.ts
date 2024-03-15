import { Schema, model } from 'mongoose';
import { TsemesterRegistration } from './SemesterRegistration.interface';
import { SemesterRegistrationStatus } from './SemesterRegistration.const';

const semesterRegistrationSchema = new Schema<TsemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemesterRegistration = model<TsemesterRegistration>(
  'AcademicSemesterRegistration',
  semesterRegistrationSchema,
);
