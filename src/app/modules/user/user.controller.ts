/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, body } = req.body;

  const result = await userServices.createStudentIntoDB(password, body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student created successfully',
    data: result,
  });
});

export const userController = {
  createStudent,
};
