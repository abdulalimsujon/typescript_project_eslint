import { Model } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContractNum: string;

  motherName: string;
  motherOccupation: string;
  motherContractName: string;
};

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  address: string;
  contract: string;
};
export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: 'male' | 'female';
  DateOfBirth?: string;
  email: string;
  contractNo: string;
  emergencyContractNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  activeStatus: 'active' | 'inactive';
  isDeleted: boolean;
};

//for creating static method

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// create a instance custom method

// export type StudentMethods = {
//   isUserExist(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
