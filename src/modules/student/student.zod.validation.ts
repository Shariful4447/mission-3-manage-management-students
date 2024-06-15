import { z } from "zod";
// Zod schema for UserName
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "Name Max Length Not more than 20 characters")
    .regex(/^[A-Z][a-zA-Z]*$/, "{VALUE} is not in capitalized format")
    .min(1, "First Name required")
    .optional(),
  middleName: z.string(),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, "{VALUE} is not valid")
    .min(1, "Last Name required"),
});

// Zod schema for Gurdian
const gurdianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father Name required"),
  fatherOccupation: z.string().min(1, "Occupation Name required"),
  fatherContactNo: z.string().min(1, "Contact number required"),
  motherName: z.string().min(1, "Mother Name required"),
  motherOccupation: z.string().min(1, "Occupation Name required"),
  motherContactNo: z.string().min(1, "Contact number required"),
});

// Zod schema for LocalGurdian
const localGurdianValidationSchema = z.object({
  name: z.string().min(1, "Name required"),
  occuption: z.string().min(1, "Occupation Name required"),
  contactNo: z.string().min(1, "Contact Number required"),
  //   address: z.string().min(1, "address required"),
});

// Zod schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20, "password is required"),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(),
      email: z.string().email("Invalid email format").min(1, "Email required"),
      constactNumber: z.string().min(1, "Contact Number required"),
      emergencyContactNo: z
        .string()
        .min(1, "Emergency Contact Number required"),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().min(1, "Present Address required"),
      permanentAddress: z.string().min(1, "Permanent Address required"),
      gurdian: gurdianValidationSchema,
      localGurdian: localGurdianValidationSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(["male", "female", "other"]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
