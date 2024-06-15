import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();
// will call controller function

router.get("/", StudentControllers.getAllStudents);
router.delete("/:studentId", StudentControllers.deleteStudent);
router.patch("/:studentId", StudentControllers.updateStudent);
router.get("/:studentId", StudentControllers.getSingleStudents);
router.get("/:studentId", StudentControllers.deleteStudent);

export const StudentRoutes = router;
