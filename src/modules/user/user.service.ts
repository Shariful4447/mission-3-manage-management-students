import { TAcademicSemester } from "./../academicSemester/academicSemester.interface";
import config from "../../config";
import { TStudent } from "../student/students.interface";
import { Student } from "../student/students.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";
import mongoose from "mongoose";

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
    //   auto generated id
    if (!admissionSemester) {
      throw new Error("Admission semester not found");
    } else {
      userData.id = await generateStudentId(admissionSemester);
    }

    // create a user model
    const newUser = await User.create(userData);
    //   create a student
    if (Object.keys(newUser).length) {
      //set id, _id as user
      payload.id = newUser.id;
      payload.user = newUser._id; //reference id
      const newStudent = await Student.create(payload);
      return newStudent;
    }
    return newUser;
  } catch (err) {}
};

export const UserService = {
  createStudentIntoDB,
};
