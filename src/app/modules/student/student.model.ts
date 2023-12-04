import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from './student.interface';

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
const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { type: String, unique: true },
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
  DateOfBirth: { type: String },
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
  activeStatus: { type: String, required: true },
});

studentSchema.methods.isUserExist = async function (id: string) {
  const ExistinUser = await Student.findOne({ id: id });

  return ExistinUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
