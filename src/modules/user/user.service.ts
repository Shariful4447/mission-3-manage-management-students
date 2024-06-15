import { TAcademicSemester } from "./../academicSemester/academicSemester.interface";
import config from "../../config";
import { TStudent } from "../student/students.interface";
import { Student } from "../student/students.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";
import mongoose from "mongoose";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //   if (await Student.isUserExists(payload.id)) {
  //     throw new Error("user already exists");
  //   }
  //   create empty user object

  const userData: Partial<TUser> = {};

  //if password is not given use default paasword
  userData.password = password || (config.default_password as string);
  //   set student/user role

  userData.role = "student";

  // find academic semester info

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );
  console.log(admissionSemester);

  const session = await mongoose.startSession();

  // transction and roollback

  try {
    session.startTransaction();
    //   auto generated id
    if (!admissionSemester) {
      throw new Error("Admission semester not found");
    } else {
      userData.id = await generateStudentId(admissionSemester);
    }

    // create a transction-1
    const newUser = await User.create([userData], { session });
    //   create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "faild to create user");
    }
    //set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference id
    // create a transction-2
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "failed to create new student"
      );
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to create user");
  }
};

export const UserService = {
  createStudentIntoDB,
};
