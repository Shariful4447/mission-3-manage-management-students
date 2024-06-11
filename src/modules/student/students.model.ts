import { Schema, model } from "mongoose";

// import validator from "validator";
import {
  TGurdian,
  TLocalGurdian,
  TStudent,
  StudentModel,
  TUserName,
  //studentMethods,
} from "./students.interface";

// schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name required"],
    trim: true,
    maxlength: [20, "Name Max Length Not more then 20 characters "],
    // validate: {
    //   validator: function (value: string) {
    //     const firstnameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstnameStr === value;
    //   },
    //   message: "{VALUE} is not in capitalized format",
    // },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last Name required"],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: "{VALUE}is not a valid",
    // },
  },
});

const gurdianSchema = new Schema<TGurdian>({
  fatherName: {
    type: String,
    required: [true, "Father Name required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Occupation Name required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Contact number required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother Name required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Occupation Name required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Contact number required"],
  },
});

const localGurdianSchema = new Schema<TLocalGurdian>({
  name: {
    type: String,
    required: [true, "Name required"],
  },
  occuption: {
    type: String,
    required: [true, "Occupation Name required"],
  },
  contactNo: {
    type: String,
    required: [true, "Contact Number required"],
  },
});

// const studentSchema = new Schema<TStudent, StudentModel, studentMethods>
const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "user id is required"],
    unique: true,
    ref: "User",
  },
  name: {
    type: userNameSchema,
    required: [true, "Name required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message:
        "{VALUE} is not valid. Gender must be : 'male', or 'female' ,or 'other'",
    },
    required: true,
  },
  dateOfBirth: { type: Date },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: "{VALUE}Email fromat required @",
    // },
  },
  constactNumber: {
    type: String,
    required: [true, "Contact Number required"],
  },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency Contact Number required"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  gurdian: gurdianSchema,
  localGurdian: {
    type: localGurdianSchema,
    required: [true, "Local gurdian info required"],
  },
  profileImage: { type: String },
  // isActive: {
  //   type: String,
  //   enum: ["active", "blocked"],
  //   default: "active",
  // },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemester",
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: "AcademicDepartment",
  },
});

// creating a custom static methods
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUsers = await Student.findOne({ id });
  return existingUsers;
};

// creating a custom instance methods

// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// model

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
