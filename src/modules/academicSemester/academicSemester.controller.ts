import statusCode from "http-status";
// import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  //   const { password, student: studentData } = req.body;

  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );

  // send response;
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic semester is created successfully",
    data: result,
  });
});
export const AcademicSemesterControllers = {
  createAcademicSemester,
};
