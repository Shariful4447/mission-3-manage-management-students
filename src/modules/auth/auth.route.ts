import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import { AuthController } from "./auth.controller";
const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationsSchema),
  AuthController.loginUser
);
export const AuthRoutes = router;
