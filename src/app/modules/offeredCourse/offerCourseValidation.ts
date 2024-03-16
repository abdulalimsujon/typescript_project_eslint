import { z } from 'zod';
import { days } from './offerCourse.const';

const offerCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      section: z.number(),
      days: z.array(z.enum([...days] as [string, ...string[]])),
      startTime: z.string().refine(
        (time) => {
          const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
          return regex.test(time);
        },
        {
          message: 'invalid input : expect hour:min in 24hours formats ',
        },
      ),
      endTime: z.string().refine(
        (time) => {
          const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
          return regex.test(time);
        },
        {
          message: 'invalid input : expect hour:min in 24hours formats ',
        },
      ),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return start < end;
      },
      {
        message: `Start time should be before  end time`,
      },
    ),
});
const UpdateOfferCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    section: z.number().optional(),
    days: z.enum([...days] as [string, ...string[]]).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const offerCourseValidation = {
  offerCourseValidationSchema,
  UpdateOfferCourseValidationSchema,
};
