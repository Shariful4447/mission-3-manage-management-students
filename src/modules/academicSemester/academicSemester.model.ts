import { Schema, model } from "mongoose";
import { TAcademicSemester, TMonth } from "./academicSemester.interface";

const months: TMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AcademicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: {
      values: ["Autumn", "Summer", "Fall"],
      message: "Please insert the semester name",
    },
    required: true,
  },
  code: {
    type: String,
    enum: {
      values: ["01", "02", "03"],
      message:
        "Please insert the semester number for Autumn-01, for Summer-02, for Fall-03",
    },
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  startMonth: {
    type: String,
    enum: months,
  },
  endMonth: {
    type: String,
    enum: months,
  },
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema
);
