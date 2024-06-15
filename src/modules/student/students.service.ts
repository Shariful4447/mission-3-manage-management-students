import { Student } from "./students.model";
import { TStudent } from "./students.interface";
import mongoose from "mongoose";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("user already exists");
  }
  const result = await Student.create(studentData); //built in static method

  return result;
  //   const student = new Student(studentData); //create an instance of

  //   if (await student.isUserExist(studentData.id)) {
  //     throw new Error("user already exists");
  //   }
  //   const result = await student.save();
  //   return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  // start session
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to delete student");
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentFromDB,
};
