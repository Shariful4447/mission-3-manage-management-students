import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const loginUser = catchAsync(async (req, re) => {
  const result = sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user is logged in successfully",
    data: result,
  });
});
export const AuthController = {
  loginUser,
};
