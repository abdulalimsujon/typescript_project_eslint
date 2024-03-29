import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'password must be string',
      })
      .max(20, { message: 'password can not be more than 20 characters' })
      .optional(),
    status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  }),
});

export const userValidation = {
  userValidationSchema,
};
