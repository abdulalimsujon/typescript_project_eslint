import { z } from 'zod';

const CreateEnrollCourseValidation = z.object({
  body: z.object({
    offerCourse: z.string(),
  }),
});

const enrollCourseValidationMark = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    student: z.string(),
    offerCourse: z.string(),
    courseMarks: z.object({
      classTest1: z.number(),
      classTest2: z.number(),
      midtermExam: z.number(),
      finalExam: z.number(),
    }),
  }),
});

export const enrolledCoursevalidation = {
  CreateEnrollCourseValidation,
  enrollCourseValidationMark,
};
