import config from "../../config";
import { TStudent } from "../student/students.interface";
import { Student } from "../student/students.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error("user already exists");
  //   }
  //   create empty user object

  const userData: Partial<TUser> = {};

  //if password is not given use default paasword
  userData.password = password || (config.default_password as string);
  //   set student/user role

  userData.role = "student";
  //   manually generated id
  userData.id = "2023100001";
  // create a user model
  const newUser = await User.create(userData);
  //   create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference id
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
  return newUser;
};

export const UserService = {
  createStudentIntoDB,
};
