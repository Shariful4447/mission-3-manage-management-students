import { NextFunction, Request, Response } from "express";
import statusCode from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(statusCode.NOT_FOUND).json({
    success: false,
    message: "API Not Found",
    error: "",
  });
};
export default notFound;
