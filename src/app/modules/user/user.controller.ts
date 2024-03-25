/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import { Express } from 'express';

const createFaculty = catchAsync(async (req, res) => {
  const { password, body } = req.body;
  const result = await userServices.CreateFacultyIntoDB(password, body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, body } = req.body;
  const file = req.file;

  const result = await userServices.createStudentIntoDB(
    file as Express.Multer.File,
    password,
    body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student created successfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const { password, body: adminData } = req.body;

  const result = await userServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
