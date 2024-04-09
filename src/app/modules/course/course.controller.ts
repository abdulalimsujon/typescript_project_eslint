import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import { CourseServices } from './course.service';
import sendResponse from '../../utilities/sendResponse';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created succesfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course are retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved succesfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CourseServices.updateCourseIntoDB(id, req.body.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is updated succesfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted succesfully',
    data: result,
  });
});

const assignFacultyIntoWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { body } = req.body;

  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Faculty is assigned succesfully',
    data: result,
  });
});
const removeFacultyIntoWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { body } = req.body;

  const result = await CourseServices.removeFacultiesWithCourseIntoDB(
    courseId,
    body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Faculty is assigned succesfully',
    data: result,
  });
});

export const getFacultiesWithCourse = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await CourseServices.getFacultiesWithCourse(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Faculty is retrieved succesfully',
    data: result,
  });
});

export const CourseControllers = {
  removeFacultyIntoWithCourse,
  createCourse,
  getSingleCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  assignFacultyIntoWithCourse,
  getFacultiesWithCourse,
};
