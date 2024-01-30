import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemesterService } from './AcademicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.CreateAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester created successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
