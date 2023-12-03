import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContractNum: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

const LocalguardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contract: { type: String, required: true },
});
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: {
    type: 'string',
    enum: ['male', 'female'],
  },
  DateOfBirth: { type: String },
  email: { type: String, required: true },
  contractNo: { type: String, required: true },
  emergencyContractNumber: { type: String, required: true },
  bloodGroup: {
    type: 'string',
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: LocalguardianSchema,
  profileImage: { type: String },
  activeStatus: { type: String, required: true },
});
export const StudentModel = model<Student>('Student', studentSchema);
