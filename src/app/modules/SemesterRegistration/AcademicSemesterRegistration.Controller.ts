import { Request, Response } from 'express';
import catchAsync from '../../utilities/catchAsync';
import { AcademicSemesterRegistrationService } from './AcademicSemesterRegistration.service';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';

const CreateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicSemesterRegistrationService.createSemesterRegistrationIntoDb(
        req.body.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'successfully academic semester Registered',
      data: result,
    });
  },
);
const getAllRegisterCourse = catchAsync(async (req: Request, res: Response) => {
  const result =
    await AcademicSemesterRegistrationService.getAllRegisterSemester(req.query);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic semester retrieve successfully',
    data: result,
  });
});

const updateRegistrationSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result =
      await AcademicSemesterRegistrationService.updateRegistationSemester(
        id,
        req.body.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'successfully academic semester Updated',
      data: result,
    });
  },
);
export const AcademicSemesterRegistrationController = {
  CreateSemesterRegistration,
  getAllRegisterCourse,
  updateRegistrationSemester,
};
