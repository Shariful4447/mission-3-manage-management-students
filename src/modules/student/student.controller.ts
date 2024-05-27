import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./students.service";
// import studentValidationSchema from "./student.validation";
import { z } from "zod";
import studentValidationSchema from "./student.zod.validation";

export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students are retrived successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "single Students are retrived successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: "students deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudents,
  deleteStudent,
};
