import { Schema, model } from 'mongoose';
import validator from 'validator';

import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    maxlength: [20, 'max length is twenty characters'],
    validate: {
      validator: function (value: string) {
        const firstName = value.charAt(0).toUpperCase() + value.slice(1);

        return firstName === value;
      },
      message: '{VALUE} is not capitalize format ',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: true,

    validate: {
      validator: (value: string) => validator.isAlpha(value),

      message: '{VALUE} is not valid',
    },
  },
});
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContractNum: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

const LocalguardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contract: { type: String, required: true },
});
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    password: {
      type: String,
      // required: [true, 'password is required'],
      // maxlength: [20, 'not more than 20 characters'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'userId is required'],
      unique: true,
      ref: 'User',
    },
    id: {
      type: String,
      required: true,
    },

    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      type: 'string',
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not Valid',
      },
      required: true,
    },
    DateOfBirth: { type: Date },
    email: {
      type: String,
      required: true,
      unique: true,

      validate: {
        validator: (value: string) => validator.isEmail(value),

        message: '{VALUE} is not valid email',
      },
    },
    contractNo: { type: String, required: true },
    emergencyContractNumber: { type: String, required: true },
    bloodGroup: {
      type: 'string',
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: LocalguardianSchema,
      required: true,
    },
    profileImage: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    // toJSON: {
    //   virtuals: true,
    // },
  },
);

// creating a static method

studentSchema.statics.isUserExists = async function (id: string) {
  const ExistinUser = await Student.findOne({ id: id });

  return ExistinUser;
};

// create a custom intance method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const ExistinUser = await Student.findOne({ id: id });

//   return ExistinUser;
// };

// -----------------pre save middleware:hooks-------------------------------->

// studentSchema.pre('save', async function (next) {
//   // console.log(this, 'pre hook we save our data');

//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;

//   user.password = await bcrypt.hash(user.password, 10);

//   next();
// });

//----------------virtual------------------------------------------------------>

// studentSchema.virtual('FullName').get(function () {
//   return this.name.firstName + this.name.middleName + this.name.lastName;
// });

studentSchema.post('save', function (doc, next) {
  this.password = ' ';
  next();
});
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
studentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isSemesterExist = await Student.findOne({
    id: query,
  });

  if (!isSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not exist');
  }

  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
