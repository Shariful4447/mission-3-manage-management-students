import { z } from "zod";
const createPreRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: "Course Title should be string",
    }),
    prefix: z.string({
      invalid_type_error: "Prefix should be String",
    }),
    code: z.number({
      invalid_type_error: "Prefix should be Number",
    }),
    credits: z.number({
      invalid_type_error: "Prefix should be Number",
    }),
    preRequisiteCourses: z
      .array(createPreRequisiteCoursesValidationSchema)
      .optional(),
  }),
  isDeleted: z.boolean().optional(),
});
const updatePreRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: "Course Title should be string",
      })
      .optional(),
    prefix: z
      .string({
        invalid_type_error: "Prefix should be String",
      })
      .optional(),
    code: z
      .number({
        invalid_type_error: "Prefix should be Number",
      })
      .optional(),
    credits: z
      .number({
        invalid_type_error: "Prefix should be Number",
      })
      .optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCoursesValidationSchema)
      .optional(),
  }),
  isDeleted: z.boolean().optional(),
});

const facultiesWithCoursesValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseVlidationSchema = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesWithCoursesValidationSchema,
};
