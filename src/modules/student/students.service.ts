import { Student } from "./students.model";
import { TStudent } from "./students.interface";
import mongoose from "mongoose";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import QueryBuilder from "../../app/builder/QueryBuilder";
import { studentSearchFields } from "./student.constant";

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

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const studentSearchFields = ["email", "name.firstName", "presentAddress"];
  // let searchTerm = "";

  // const queryObj = { ...query };

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });

  // // filtering
  // const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  // excludeFields.forEach((el) => delete queryObj[el]);
  // console.log(
  //   "base query",
  //   { query },
  //   "After removing search term the rest query ob",
  //   { queryObj }
  // );

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate("admissionSemester")
  //   .populate({
  //     path: "academicDepartment",
  //     populate: {
  //       path: "academicFaculty",
  //     },
  //   });
  // let sort = "-createdAt";
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);
  // let page = 1;
  // let limit = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQury = sortQuery.skip(skip);

  // const limitQuery = paginateQury.limit(limit);

  // // field limiting

  // let fields = "-__v";
  // if (query.fields) {
  //   // field: 'name,email' =>'name email'
  //   fields = (query.fields as string).split(",").join(" ");
  //   console.log({ fields });
  // }

  // const fieldQury = await limitQuery.select(fields);

  // return fieldQury;
  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(studentSearchFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
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
const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, gurdian, localGurdian, ...reaminingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...reaminingStudentData,
  };
  /*
  gurdian:{
    "fatherOcupation": "Teacher"
  } 
  /instead we use 
  gurdian.fatherOcupation = "Teacher" to avoid mutation
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (gurdian && Object.keys(gurdian).length) {
    for (const [key, value] of Object.entries(gurdian)) {
      modifiedUpdatedData[`gurdian.${key}`] = value;
    }
  }
  if (localGurdian && Object.keys(localGurdian).length) {
    for (const [key, value] of Object.entries(localGurdian)) {
      modifiedUpdatedData[`localGurdian.${key}`] = value;
    }
  }
  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
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
    throw new Error("Failed to delete student");
  }
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
};
