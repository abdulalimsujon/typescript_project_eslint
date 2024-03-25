import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';
import { authServices } from './Auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body.body);
  const { refreshToken, accessToken, needPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'development',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user is logged in successfully',
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body.body;

  await authServices.changePassword(req.user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password  is updated in successfully',
    data: null,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const token = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Here is access token',
    data: token,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const { id } = req.body.body;

  const result = await authServices.forgetPassword(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'reset link is generated successfully',
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const payload = req.body.body;

  const result = await authServices.resetPassword(payload, token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is reset succssfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await authServices.getMe(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'User data is retrieve successfully',
  });
});
const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body.body;
  const result = await authServices.changeStatus(id, status);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'status is updated successfully',
    data: result,
  });
});
export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
  getMe,
  changeStatus,
};
