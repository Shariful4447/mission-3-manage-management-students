import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicdepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "academicFaculty",
    },
  },

  {
    timestamps: true,
  }
);
export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
