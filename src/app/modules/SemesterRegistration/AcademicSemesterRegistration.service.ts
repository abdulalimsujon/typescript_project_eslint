import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { AcademicSemester } from '../AcademicSemester/AcademicSemester.model';
import { TsemesterRegistration } from './SemesterRegistration.interface';
import { AcademicSemesterRegistration } from './AcademicSemesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDb = async (
  payload: TsemesterRegistration,
) => {
  const academicSemesterExist = await AcademicSemester.findById({
    _id: payload.academicSemester,
  });

  const isThereAnyUpcomingAndOngoingSemester =
    await AcademicSemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });

  if (isThereAnyUpcomingAndOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `there are already an ${isThereAnyUpcomingAndOngoingSemester.status} semester`,
    );
  }
  const isSemesterRegistrationExist =
    await AcademicSemesterRegistration.findOne({
      academicSemester: payload?.academicSemester,
    });
  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Academic Semster registration is exists',
    );
  }
  if (!academicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'SemesterNotFound');
  }

  const result = await AcademicSemesterRegistration.create(payload);

  return result;
};

const getAllRegisterSemester = async (query: Record<string, unknown>) => {
  const semesterRegisterQuery = new QueryBuilder(
    AcademicSemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegisterQuery.modelQuery;
  return result;
};

const updateRegistationSemester = async (
  id: string,
  payload: TsemesterRegistration,
) => {
  const requestSemester = await AcademicSemesterRegistration.findById({
    _id: id,
  });
  if (requestSemester?.status === 'UPCOMING' && payload?.status === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot change the status from ${requestSemester.status} to ${payload?.status}`,
    );
  }
  if (requestSemester?.status === 'ONGOING' && payload?.status === 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot change the status from ${requestSemester.status} to ${payload?.status}`,
    );
  }
  if (!requestSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      ` Academic semster is not exists`,
    );
  }

  if (requestSemester?.status === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Academic semster is already ${requestSemester.status}`,
    );
  }

  const result = await AcademicSemesterRegistration.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

export const AcademicSemesterRegistrationService = {
  createSemesterRegistrationIntoDb,
  getAllRegisterSemester,
  updateRegistationSemester,
};
