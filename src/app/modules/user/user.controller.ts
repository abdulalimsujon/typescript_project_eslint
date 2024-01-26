/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student } = req.body;

    const result = await userServices.createStudentIntoDB(password, student);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      // error: error,
    });
  }
};

export const userController = {
  createStudent,
};
