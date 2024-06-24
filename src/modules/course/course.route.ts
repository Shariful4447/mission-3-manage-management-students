import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseVlidationSchema } from "./course.validation";
import { CourseController } from "./course.controller";
const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CourseVlidationSchema.createCourseValidationSchema),
  CourseController.createCourse
);
router.patch(
  "/:id",
  validateRequest(CourseVlidationSchema.updateCourseValidationSchema),
  CourseController.updateCourse
);
router.put(
  "/:courseId/assign-faculties",
  validateRequest(
    CourseVlidationSchema.assignFacultiesWithCoursesValidationSchema
  ),
  CourseController.assignFaculties
);

router.get("/", CourseController.getAllCourse);
router.get("/:id", CourseController.getSingleCourse);
router.delete("/:id", CourseController.deleteCourse);

export const CourseRoutes = router;
