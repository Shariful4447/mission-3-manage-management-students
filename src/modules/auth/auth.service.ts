import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../app/errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
  // check if the user is present

  const isUserPresent = await User.findOne({ id: payload?.id });
  if (!isUserPresent) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }
  //   check is the user is deleted

  const isUserDeleted = isUserPresent?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "user already deleted");
  }
  //   check is the user status blocked or in -prgress

  const userStatus = isUserPresent?.status;
  if (userStatus === "blocked") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "user already status not permited, user is blocked"
    );
  }
  //   checking the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserPresent?.password
  );
  //   access granted send access token to the database
  return {};
};
