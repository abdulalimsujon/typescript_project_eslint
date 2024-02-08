import { TAcademicDepartment } from './AcademicDepartment.interface';
import { AcademicDepartment } from './AcademicDepartment.model';

const CreateAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentIntoDB = async () => {
  const result = await AcademicDepartment.find({}).populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findOne({ _id: id }).populate(
    'academicFaculty',
  );
  return result;
};

const updateAcademicDepartment = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentService = {
  CreateAcademicDepartmentIntoDB,
  getSingleAcademicDepartment,
  getAllAcademicDepartmentIntoDB,
  updateAcademicDepartment,
};
