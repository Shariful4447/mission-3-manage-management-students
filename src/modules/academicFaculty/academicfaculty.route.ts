import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyController } from "./academicFaculty.controller";
const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(academicFacultyValidation.createFacultyValidationSchema),
  AcademicFacultyController.createAcademicFaculty
);

router.get("/", AcademicFacultyController.getAllAcademicFaculties);

router.get("/:facultyId", AcademicFacultyController.getSingleAcademicFaculty);

router.patch(
  "/:facultyId",
  validateRequest(academicFacultyValidation.updateFacultyValidationSchema),
  AcademicFacultyController.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;
