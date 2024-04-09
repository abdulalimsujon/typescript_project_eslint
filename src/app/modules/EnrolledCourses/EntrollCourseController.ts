import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { enrollCourseServices } from './EnrolledCourseServices';

const createEnrollCourse = catchAsync(async (req, res) => {
  const enrollCourse = req.body.body;
  const user = req.user.userId;

  const result = await enrollCourseServices.createEnrollCourse(
    user,
    enrollCourse,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'entroll course successfully created',
    data: result,
  });
});
const updateCourseMarksIntoDb = catchAsync(async (req, res) => {
  const payload = req.body.body;
  const facultyId = req.user.userId;
  const result = await enrollCourseServices.updateCourseMarksIntoDb(
    facultyId,
    payload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'entroll course successfully created',
    data: result,
  });
});
export const enrollCourseController = {
  createEnrollCourse,
  updateCourseMarksIntoDb,
};
