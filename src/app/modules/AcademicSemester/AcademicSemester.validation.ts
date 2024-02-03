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

const updateAcademicSemesterSchemaValidation = z.object({
  body: z.object({
    name: z.enum([...semesterName] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum([...code] as [string, ...string[]]).optional(),
    startMonth: z.enum([...months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...months] as [string, ...string[]]).optional(),
  }),
});
export const AcademicSemesterValidation = {
  CreateAcademicSemesterValidationSchema,
  updateAcademicSemesterSchemaValidation,
};
