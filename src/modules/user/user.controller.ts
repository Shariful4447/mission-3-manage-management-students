import statusCode from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  // using Zod and creating schema

  //   const zodParsedData = studentValidationSchema.parse(studentData);

  // using Joi
  // const { error, value } = studentValidationSchema.validate(studentData);
  // // will call service function to send the data
  // const result = await StudentServices.createStudentIntoDB(value);
  const result = await UserService.createStudentIntoDB(password, studentData);

  // if (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: "Something went wrong",
  //     error,
  //   });
  // }

  // send response;
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student created successfully",
    data: result,
  });
});
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is created succesfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created succesfully",
    data: result,
  });
});
export const UserControllers = {
  createStudent,
  createAdmin,
  createFaculty,
};
