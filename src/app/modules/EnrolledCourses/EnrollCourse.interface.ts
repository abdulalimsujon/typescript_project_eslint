import { Types } from 'mongoose';

export type TGrade = 'A' | 'B' | 'C' | 'D' | 'E' | 'NA';

export type TEnrolledCoursecourseMark = {
  classTest1: number;
  classTest2: number;
  midtermExam: number;
  finalExam: number;
};

export type TEnrolledCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  offerCourse: Types.ObjectId;
  course: Types.ObjectId;
  student: Types.ObjectId;
  faculty: Types.ObjectId;
  isEnrolled: boolean;
  courseMarks: TEnrolledCoursecourseMark;
  grade: TGrade;
  gradePoints: number;
  isCompleted: boolean;
};
