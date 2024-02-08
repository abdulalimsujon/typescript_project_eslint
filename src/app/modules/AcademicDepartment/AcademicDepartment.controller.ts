import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { AcademicDepartmentService } from './AcademicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const { body } = req.body;
  const result =
    await AcademicDepartmentService.CreateAcademicDepartmentIntoDB(body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const AllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentService.getAllAcademicDepartmentIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester fetched successfully',
    data: result,
  });
});

const updatedDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;

  const { body } = req.body;

  const result = await AcademicDepartmentService.updateAcademicDepartment(
    id,
    body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester fetched successfully',
    data: result,
  });
});

const getSingleAcademicDepartemnt = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result =
    await AcademicDepartmentService.getSingleAcademicDepartment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester fetched successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  AllAcademicDepartment,
  createAcademicDepartment,
  updatedDepartment,
  getSingleAcademicDepartemnt,
};
