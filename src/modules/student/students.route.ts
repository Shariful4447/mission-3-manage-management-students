import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidation } from "./student.zod.validation";

const router = express.Router();
// will call controller function

router.get("/", StudentControllers.getAllStudents);
router.delete("/:studentId", StudentControllers.deleteStudent);
router.patch(
  "/:studentId",
  validateRequest(studentValidation.updateStudentValidationSchema),
  StudentControllers.updateStudent
);
router.get("/:studentId", StudentControllers.getSingleStudents);
router.get("/:studentId", StudentControllers.deleteStudent);

export const StudentRoutes = router;
