export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContractNum: string;

  motherName: string;
  motherOccupation: string;
  motherContractName: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type LocalGuardian = {
  name: string;
  address: string;
  contract: string;
};
export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  DateOfBirth?: string;
  email: string;
  contractNo: string;
  emergencyContractNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  activeStatus: 'active' | 'inactive';
};
