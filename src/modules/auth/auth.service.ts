import httpStatus from "http-status";
import AppError from "../../app/errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
  // check if the user is presend

  const isUserPresent = await User.findOne({ id: payload?.id });
  if (!isUserPresent) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }

  return result;
};
