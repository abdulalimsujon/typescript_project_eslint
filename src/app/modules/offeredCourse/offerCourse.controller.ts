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

export const offerCourseController = {
  createOffercourse,
};
