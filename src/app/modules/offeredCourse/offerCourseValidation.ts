import { z } from 'zod';
import { days } from './offerCourse.const';

const timeStringSChema = z.string().refine(
  (time) => {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return regex.test(time);
  },
  {
    message: 'invalid input : expect hour:min in 24hours formats ',
  },
);

const offerCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      section: z.number(),
      days: z.array(z.enum([...days] as [string, ...string[]])),
      startTime: timeStringSChema,
      endTime: timeStringSChema,
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
    faculty: z.string(),
    days: z.array(z.enum([...days] as [string, ...string[]])),
    startTime: timeStringSChema,
    endTime: timeStringSChema,
  }),
});

export const offerCourseValidation = {
  offerCourseValidationSchema,
  UpdateOfferCourseValidationSchema,
};
