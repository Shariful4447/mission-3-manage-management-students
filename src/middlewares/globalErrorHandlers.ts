import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../app/interface/error";
import config from "../config";
import handleZodError from "../app/errors/handleZodError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default value
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    (message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources);
  }

  // ultimate return

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "development" ? err?.stack : null,
    // error: err,
  });
};

export default globalErrorHandler;

/*
want to error pattern like this:
success
message:
errorSources[
  path:'',
  message: ''

]
stack:
*/
