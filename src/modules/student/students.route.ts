import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidation } from "./student.zod.validation";

const router = express.Router();
// will call controller function

router.get("/", StudentControllers.getAllStudents);
router.get("/:id", StudentControllers.getSingleStudents);

router.patch(
  "/:id",
  validateRequest(studentValidation.updateStudentValidationSchema),
  StudentControllers.updateStudent
);
router.delete("/:id", StudentControllers.deleteStudent);

export const StudentRoutes = router;
