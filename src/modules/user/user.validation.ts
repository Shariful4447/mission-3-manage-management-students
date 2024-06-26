import { z } from "zod";
const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "password must be string",
    })
    .max(20, { message: "password cant be more then 20 charactars" })
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
