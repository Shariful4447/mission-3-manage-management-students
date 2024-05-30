import { Model, Types } from "mongoose";

export type TGurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TLocalGurdian = {
  name: string;
  occuption: string;
  contactNo: string;
  address?: string;
};
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: "male" | "female" | "other";
  dateOfBirth?: Date;
  email: string;
  constactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  gurdian: TGurdian;
  localGurdian: TLocalGurdian;
  profileImage?: string;
};

// for creating static instances
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

//for creating custom instance variables

// export type studentMethods = {
//   isUserExist(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   studentMethods
// >;
