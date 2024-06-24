import mongoose from "mongoose";
import QueryBuilder from "../../app/builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();
  try {
    // transction and roolback
    const session = await mongoose.startSession();
    // step-1 :basic course info update
    const updatedBasicCourseinfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );
    if (!updatedBasicCourseinfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "failed to update basic course info"
      );
    }

    // check if there is any prerequisite course for update

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out deleted fields with isdeleted:true
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletedPrerequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );
      if (!deletedPrerequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "failed to delete basic course info"
        );
      }
      // filter out the new course
      const newPreRequisite = await preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted
      );
      const newpreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );
      if (!newpreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "failed to Add new basic course info"
        );
      }
      const result = await Course.findById(id).populate(
        "preRequisiteCourses.course"
      );

      return result;
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "failed to delete basic course info"
    );
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
  return result;
};
const assignCourseFacultyIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return result;
};

export const CourseService = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignCourseFacultyIntoDB,
};
