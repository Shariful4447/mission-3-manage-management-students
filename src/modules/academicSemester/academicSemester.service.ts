import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //check semester name and code are same
  type TacademicSemesterCodeMapper = {
    [key: string]: string;
  };
  const academicSemesterCodeMapper: TacademicSemesterCodeMapper = {
    Autumn: "01",
    Summer: "02",
    Fall: "03",
  };
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error("Envalid semster code");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
};
