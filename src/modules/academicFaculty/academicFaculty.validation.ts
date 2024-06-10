import { z } from "zod";

const facultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "Academic Faculty name must be string",
  }),
});

export const facultyValidation = {
  facultyValidationSchema,
};
