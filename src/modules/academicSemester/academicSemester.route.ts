import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();
// post
router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidation.createAcademicSsemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
);

export const AcademicSemesterRoute = router;
