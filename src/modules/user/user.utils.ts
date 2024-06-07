import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
// first student id will be 00000
// id format should be year+semester-code+initial 4 digit number+1
export const generateStudentId = (payload: TAcademicSemester) => {
  const currentId = (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
