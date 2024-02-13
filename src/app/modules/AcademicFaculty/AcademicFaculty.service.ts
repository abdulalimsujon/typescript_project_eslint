import { TAcademicFaculty } from './AcademicFaculty.interface';
import { AcademicFaculty } from './AcademicFaculty.model';

const getAllAcademicFacultiesIntoDB = async () => {
  const result = await AcademicFaculty.find({});
  return result;
};

const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findOne({ _id: id });
  return result;
};

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
    },
  );

  return result;
};

export const AcademicFacultyService = {
  getAllAcademicFacultiesIntoDB,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
