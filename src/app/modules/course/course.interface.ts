import { Types } from 'mongoose';

export type preRequisiteCourse = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type Tcourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [preRequisiteCourse];
  isDeleted?: boolean;
};

export type TCourseFaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};

export type TcourseAssignFaculty = {
  course: Types.ObjectId;
  faculties: string[];
};
