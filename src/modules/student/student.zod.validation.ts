import { z } from "zod";
// Zod schema for UserName
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "Name Max Length Not more than 20 characters")
    .regex(/^[A-Z][a-zA-Z]*$/, "{VALUE} is not in capitalized format")
    .min(1, "First Name required"),
  middleName: z.string().optional(),
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
      dateOfBirth: z.date().optional(),
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
    }),
  }),
});

export default createStudentValidationSchema;
