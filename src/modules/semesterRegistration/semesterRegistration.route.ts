import { SemesterRegistrationController } from "./semesterRegistration.controller";
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
const router = express.Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationController.createSemesterRegistration
);
router.get(
  "/",

  SemesterRegistrationController.getAllSemesterRegistrations
);
router.get(
  "/:id",

  SemesterRegistrationController.getSingleSeemsterRegistration
);
export const SemesterRegistrationRoutes = router;
