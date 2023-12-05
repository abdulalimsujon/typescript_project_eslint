// validate with joi
import Joi from 'joi';

const userNameValidationJoiSchema = Joi.object({
  firstName: Joi.string().required().max(20),
  //   .pattern(/^[A-Z][a-z]*$/, { name: 'capitalize' }),

  middleName: Joi.string().required(),
  lastName: Joi.string().required(),
  // .pattern(/^[A-Za-z]+$/, { name: 'alpha' })
});

// Joi schema for guardian
const guardianValidationJoiSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContractNum: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
});

// Joi schema for localGuardian
const localGuardianValidationJoiSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  contract: Joi.string().required(),
});

const studentJoiSchema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().required(),
  name: userNameValidationJoiSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  DateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contractNo: Joi.string().required(),
  emergencyContractNumber: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationJoiSchema.required(),
  localGuardian: localGuardianValidationJoiSchema.required(),
  profileImage: Joi.string(),
  activeStatus: Joi.string().required(),
  isDeleted: Joi.boolean(),
});

export default studentJoiSchema;
