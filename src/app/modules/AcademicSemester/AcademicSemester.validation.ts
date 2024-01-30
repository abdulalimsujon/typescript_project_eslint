import { z } from 'zod';
import { code, months, semesterName } from './AcademicSemester.const';

const CreateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...semesterName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...code] as [string, ...string[]]),
    startMonth: z.enum([...months] as [string, ...string[]]),
    endMonth: z.enum([...months] as [string, ...string[]]),
  }),
});

export const AcademicSemesterValidation = {
  CreateAcademicSemesterValidationSchema,
};
