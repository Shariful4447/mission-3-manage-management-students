// creating schema validation using joi
import Joi from "joi";
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-zA-Z]*$/)
    .required()
    .messages({
      "string.base": "First Name should be a type of text",
      "string.empty": "First Name required",
      "string.max": "Name Max Length Not more than 20 characters",
      "string.pattern.base": "{#value} is not in capitalized format",
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      "string.base": "Last Name should be a type of text",
      "string.empty": "Last Name required",
      "string.pattern.base": "{#value} is not a valid last name",
    }),
});

// Joi schema for Gurdian
const gurdianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "string.base": "Father Name should be a type of text",
    "string.empty": "Father Name required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "string.base": "Father Occupation should be a type of text",
    "string.empty": "Occupation Name required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "string.base": "Father Contact Number should be a type of text",
    "string.empty": "Contact number required",
  }),
  motherName: Joi.string().required().messages({
    "string.base": "Mother Name should be a type of text",
    "string.empty": "Mother Name required",
  }),
  motherOccupation: Joi.string().required().messages({
    "string.base": "Mother Occupation should be a type of text",
    "string.empty": "Occupation Name required",
  }),
  motherContactNo: Joi.string().required().messages({
    "string.base": "Mother Contact Number should be a type of text",
    "string.empty": "Contact number required",
  }),
});

// Joi schema for LocalGurdian
const localGurdianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name required",
  }),
  occuption: Joi.string().required().messages({
    "string.base": "Occupation should be a type of text",
    "string.empty": "Occupation Name required",
  }),
  contactNo: Joi.string().required().messages({
    "string.base": "Contact Number should be a type of text",
    "string.empty": "Contact Number required",
  }),
});

// Joi schema for Student
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID should be a type of text",
    "string.empty": "ID required",
  }),
  name: userNameValidationSchema.required().messages({
    "object.base": "Name should be an object",
    "any.required": "Name required",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "string.base": "Gender should be a type of text",
    "any.only":
      '{#value} is not valid. Gender must be: "male", "female", or "other"',
    "any.required": "Gender required",
  }),
  dateOfBirth: Joi.string().optional().messages({
    "string.base": "Date of Birth should be a type of text",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text",
    "string.email": "{#value} is not a valid email",
    "any.required": "Email required",
  }),
  constactNumber: Joi.string().required().messages({
    "string.base": "Contact Number should be a type of text",
    "string.empty": "Contact Number required",
  }),
  emergencyContactNo: Joi.string().required().messages({
    "string.base": "Emergency Contact Number should be a type of text",
    "string.empty": "Emergency Contact Number required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .optional()
    .messages({
      "string.base": "Blood Group should be a type of text",
      "any.only": "{#value} is not a valid blood group",
    }),
  presentAddress: Joi.string().required().messages({
    "string.base": "Present Address should be a type of text",
    "string.empty": "Present Address required",
  }),
  permanentAddress: Joi.string().required().messages({
    "string.base": "Permanent Address should be a type of text",
    "string.empty": "Permanent Address required",
  }),
  gurdian: gurdianValidationSchema.required().messages({
    "object.base": "Guardian should be an object",
    "any.required": "Guardian information required",
  }),
  localGurdian: localGurdianValidationSchema.required().messages({
    "object.base": "Local Guardian should be an object",
    "any.required": "Local Guardian information required",
  }),
  profileImage: Joi.string().uri().optional().messages({
    "string.base": "Profile Image should be a type of text",
    "string.uri": "Profile Image must be a valid URI",
  }),
  isActive: Joi.string().valid("active", "blocked").default("active").messages({
    "string.base": "Status should be a type of text",
    "any.only": '{#value} is not valid. Status must be: "active" or "blocked"',
  }),
});
export default studentValidationSchema;
