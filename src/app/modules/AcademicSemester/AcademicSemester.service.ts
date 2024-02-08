import { AcademicSemesterTimeWrapper } from './AcademicSemester.const';
import { TAcademicSemester } from './AcademicSemester.interface';
import { AcademicSemester } from './AcademicSemester.model';

// create academic semester
const CreateAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (AcademicSemesterTimeWrapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

// get single academic semester

const getSingleAcademicSemester = async (id: string) => {
  const result = await AcademicSemester.find({ _id: id });

  return result;
};

// get all academic semester
const getAllSemester = async () => {
  const result = await AcademicSemester.find({});

  return result;
};

// update academic semester
const updateAcademicSemester = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterTimeWrapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const AcademicSemesterService = {
  CreateAcademicSemesterIntoDB,
  getAllSemester,
  updateAcademicSemester,
  getSingleAcademicSemester,
};
