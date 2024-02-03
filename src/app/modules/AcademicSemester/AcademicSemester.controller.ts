import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemesterService } from './AcademicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const { body } = req.body;

  const result =
    await AcademicSemesterService.CreateAcademicSemesterIntoDB(body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester created successfully',
    data: result,
  });
});

const AllSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getAllSemester();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester fetched successfully',
    data: result,
  });
});

const updatedSemster = catchAsync(async (req, res) => {
  const id = req.params.id;
  const reqBody = req.body;
  const result = await AcademicSemesterService.updateAcademicSemester(
    id,
    reqBody,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester fetched successfully',
    data: result,
  });
});

const getSingleSemester = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.getSingleAcademicSemester(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester fetched successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  AllSemester,
  updatedSemster,
  getSingleSemester,
};
