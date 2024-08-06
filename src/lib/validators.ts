import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility";

const validateHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("email", "Please Enter  Email").notEmpty(),
  body("password", "Please Enter a Password ").notEmpty(),
];

const loginValidator = () => [
  body("email", "Please Enter email").notEmpty(),
  body("password", "Please Enter password").notEmpty(),
];

export { registerValidator, validateHandler, loginValidator };
