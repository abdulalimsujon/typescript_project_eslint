import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { offerCourseService } from './offerCourse.services';
import { Request, Response } from 'express';

const createOffercourse = catchAsync(async (req: Request, res: Response) => {
  const reqbody = req.body.body;
  const result = await offerCourseService.createOfferCourseIntoDb(reqbody);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is created successfully',
    data: result,
  });
});
const updateOfferCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await offerCourseService.updateOfferCourseIntoDb(
    id,
    req.body.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'offer course successfully updated',
    data: result,
  });
});
const myOfferedCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  const result = await offerCourseService.myOfferedCourse(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'offer course successfully retrieved',
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
  const result = await offerCourseService.getAllOfferCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course are retrieved successfully',
    data: result,
  });
});

export const offerCourseController = {
  createOffercourse,
  updateOfferCourse,
  myOfferedCourse,
  getAllOfferedCourses,
};
