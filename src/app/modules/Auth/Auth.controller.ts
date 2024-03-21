import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';
import { authServices } from './Auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user is logged in successfully',
    data: result,
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

export const AuthController = {
  loginUser,
  changePassword,
};
