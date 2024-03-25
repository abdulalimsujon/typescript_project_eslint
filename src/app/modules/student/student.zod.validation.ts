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
const updateUserNameZodSchema = z.object({
  firstName: z
    .string()
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name should be in capitalize format',
      },
    )
    .optional(),

  middleName: z.string().min(1).optional(),
  lastName: z
    .string()
    .refine((value) => validator.isAlpha(value), {
      message: 'Last name should only contain letters',
    })
    .optional(),
});

// Define Zod schema for Guardian
const guardianZodSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContractNum: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
});
const updateGuardianZodSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContractNum: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
});

// Define Zod schema for LocalGuardian
const localGuardianZodSchema = z.object({
  name: z.string(),
  address: z.string(),
  contract: z.string(),
});
const updateLocalGuardianZodSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  contract: z.string().optional(),
});
// Define Zod schema for the main Student model
export const studentZodSchema = z.object({
  password: z.string().max(20),
  body: z.object({
    id: z.string().optional(),
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
    admissionSemester: z.string(),

    permanentAddress: z.string(),
    guardian: guardianZodSchema,
    localGuardian: localGuardianZodSchema,
    // profileImage: z.string().optional(),
    activeStatus: z.string(),
    academicDepartment: z.string(),
  }),
});
export const updateStudentZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: updateUserNameZodSchema,
    gender: z.enum(['male', 'female', 'other']).optional(),
    DateOfBirth: z.string().optional(),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    contractNo: z.string().optional(),
    emergencyContractNumber: z.string().optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    presentAddress: z.string().optional(),
    admissionSemester: z.string().optional(),
    permanentAddress: z.string().optional(),
    guardian: updateGuardianZodSchema.optional(),
    localGuardian: updateLocalGuardianZodSchema.optional(),
    profileImage: z.string().optional(),
    activeStatus: z.string().optional(),
    academicDepartment: z.string().optional(),
  }),
});

export const studentValidation = {
  studentZodSchema,
  updateStudentZodSchema,
};
