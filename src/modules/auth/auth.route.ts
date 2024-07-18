import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationsSchema),
  AuthControllers.loginUser
);
export const AuthRoutes = router;
