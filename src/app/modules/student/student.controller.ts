import { RequestHandler } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';

const getAllStudent = catchAsync(async (req, res) => {
  const searchTerm = req.query;
  const result = await studentServices.getAllStudent(searchTerm);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student get successfully',
    data: result,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.studentId;

  const result = await studentServices.getSingleStudent(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student search successfully',
    data: result,
  });
});
const DeleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.studentId;

  const result = await studentServices.DeleteStudentFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student deleted successfully',
    data: result,
  });
});
const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.studentId;
  const body = req.body.body;

  const result = await studentServices.updateStudentFromDb(id, body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student updated successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  DeleteStudent,
  updateStudent,
};
