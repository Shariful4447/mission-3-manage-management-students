import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constants";

const AcademicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: {
      values: AcademicSemesterName,
      message: "Please insert the semester name",
    },
    required: true,
  },
  code: {
    type: String,
    enum: {
      values: AcademicSemesterCode,
      message:
        "Please insert the semester number for Autumn-01, for Summer-02, for Fall-03",
    },
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum: Months,
  },
  endMonth: {
    type: String,
    enum: Months,
  },
});

AcademicSemesterSchema.pre("save", async function (next) {
  const isAcademicSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isAcademicSemesterExists) {
    throw new Error("Academic Semester already exists");
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema
);
