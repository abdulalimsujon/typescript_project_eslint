import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { AcademicFacultyService } from './AcademicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.createAcademicFaculty(
    req.body.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester fetched successfully',
    data: result,
  });
});

const AllFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getAllAcademicFacultiesIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester fetched successfully',
    data: result,
  });
});

const updatedFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;

  const { body } = req.body;

  const result = await AcademicFacultyService.updateAcademicFaculty(id, body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester fetched successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AcademicFacultyService.getSingleAcademicFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester fetched successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  AllFaculty,
  updatedFaculty,
  getSingleAcademicFaculty,
};
