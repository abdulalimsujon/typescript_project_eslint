import { Types } from 'mongoose';

export type days = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';

export type TofferedCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemesterter: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: Types.ObjectId;
  section: number;
  days: days;
  statDate: string;
  endDate: string;
};
