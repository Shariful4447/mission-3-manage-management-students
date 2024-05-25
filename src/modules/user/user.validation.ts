import { z } from "zod";
const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .max(20, { message: "password cant be more then 20 charactars" }),
  needPasswordChange: z.boolean().optional(),
  role: z.enum(["student", "faculty", "admin"]),
  status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = {
  userValidationSchema,
};
