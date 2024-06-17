import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../app/interface/error";

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
  const handleZodError = (err: ZodError) => {
    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    const statusCode = 400;
    return {
      statusCode,
      message: "Zod Validation Error",
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    (message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
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
