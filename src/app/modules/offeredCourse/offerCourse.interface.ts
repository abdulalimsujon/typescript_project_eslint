import { Types } from 'mongoose';

export type days = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
export type TschuduleTime = {
  days: days;
  startTime: string;
  endTime: string;
};

export type TofferedCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: days;
  startTime: string;
  endTime: string;
};
