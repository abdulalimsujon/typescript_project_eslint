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
};

export type StudentMethods = {
  isUserExist(id: string): Promise<TStudent | null>;
};

//step 1 ---> custom instance  method er jonne akta model type toiri korbo
// step 2-> sei model a parameter hobe 1. main model er type 2. empty object 3.instance method er type
//step 3--> then main model schema te 1. main model er type 2.custom method er schema 3.instance method er type
//step-4 -->then main model the custom method er type use kore method toiri korte hobe

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>;
