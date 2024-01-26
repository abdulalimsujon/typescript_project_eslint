import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudent();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const result = await studentServices.getSingleStudent(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student search successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const DeleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const result = await studentServices.DeleteStudentFromDb(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  // createStudent,
  getAllStudent,
  getSingleStudent,
  DeleteStudent,
};
