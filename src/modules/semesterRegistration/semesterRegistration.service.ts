import statusCode from "http-status";

import AppError from "../../app/errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import httpStatus from "http-status";
import QueryBuilder from "../../app/builder/QueryBuilder";
import { SemesterRegistrationSearchableFields } from "./semesterRegistration.constant";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  //   check if there any semster registration is in 'upcoming' or 'ongoing' status
  const isTehereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        {
          status: "UPCOMING",
        },
        { status: "ONGOING" },
      ],
    });
  if (isTehereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There  is already a ${isTehereAnyUpcomingOrOngoingSemester.status} semester Exists`
    );
  }

  // check if the AcademicSemester is exists
  const isAcademicSemesterExists = await AcademicSemester.findById(
    academicSemester
  );
  if (!isAcademicSemesterExists) {
    throw new AppError(statusCode.NOT_FOUND, "AcademicSemester not found");
  }
  //   check if the ademicSemester registration is already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, "This semester is already Exists");
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};
const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>
) => {
  const SemesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await SemesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id).populate(
    "academicSemester"
  );

  return result;
};
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  // TODO: if the requested semseterRegistration is ededd we will not update anything
  const requestedSemester = await SemesterRegistration.findById(id);
  if (requestedSemester?.status === "ENDED") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This Semester already ${requestedSemester.status}`
    );
  }
};
const deleteSemesterRegistrationFromDB = async () => {};
export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
