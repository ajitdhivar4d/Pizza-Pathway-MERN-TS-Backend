import { NextFunction, Request, Response } from "express";
import { ControllerType } from "../types/types.js";
import { ErrorHandler } from "../utils/utility-class.js";

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.message ||= "Internal sever error";
  err.statusCode ||= 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const TryCatch =
  (passedFunc: ControllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(passedFunc(req, res, next)).catch(next);
  };
