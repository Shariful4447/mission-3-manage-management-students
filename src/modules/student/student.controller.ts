import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./students.service";
// import studentValidationSchema from "./student.validation";
import { z } from "zod";
import studentValidationSchema from "./student.zod.validation";
import globalErrorHandlers from "../../middlewares/globalErrorHandlers";
import catchAsync from "../../utils/catchAsync";

export const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  res.status(200).json({
    success: true,
    message: "Students are retrived successfully",
    data: result,
  });
});

const getSingleStudents = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentsFromDB(studentId);
  res.status(200).json({
    success: true,
    message: "single Students are retrived successfully",
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  res.status(200).json({
    success: true,
    message: "students deleted successfully",
    data: result,
  });
});

export const StudentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudents,
  deleteStudent,
};
