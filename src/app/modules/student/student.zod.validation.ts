import { z } from 'zod';
import validator from 'validator';

// Define Zod schema for UserName
const userNameZodSchema = z.object({
  firstName: z
    .string()
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name should be in capitalize format',
      },
    ),

  middleName: z.string().min(1).optional(),
  lastName: z.string().refine((value) => validator.isAlpha(value), {
    message: 'Last name should only contain letters',
  }),
});

// Define Zod schema for Guardian
const guardianZodSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContractNum: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
});

// Define Zod schema for LocalGuardian
const localGuardianZodSchema = z.object({
  name: z.string(),
  address: z.string(),
  contract: z.string(),
});

// Define Zod schema for the main Student model
export const studentZodSchema = z.object({
  id: z.string(),
  name: userNameZodSchema,
  gender: z.enum(['male', 'female', 'other']),
  DateOfBirth: z.string().optional(),
  email: z.string().email({ message: 'Invalid email format' }),

  contractNo: z.string(),
  emergencyContractNumber: z.string(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianZodSchema,
  localGuardian: localGuardianZodSchema,
  profileImage: z.string().optional(),
  activeStatus: z.string(),
});

export default studentZodSchema;
