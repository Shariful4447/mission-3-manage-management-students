import statusCode from "http-status";
import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (err) {
    next(err);
  }
};
export const UserControllers = {
  createStudent,
};
