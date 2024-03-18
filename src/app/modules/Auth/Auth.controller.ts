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

export const AuthController = {
  loginUser,
};
