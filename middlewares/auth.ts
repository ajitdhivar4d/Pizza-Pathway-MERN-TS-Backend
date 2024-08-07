import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { USER_TOKEN } from "../constants/config";
import { ErrorHandler } from "../utils/utility";
import { User } from "../models/user";

export interface DecodedToken extends JwtPayload {
  _id: string;
}

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies[USER_TOKEN];

  if (!token)
    return next(new ErrorHandler("Please login to access this Route", 401));

  try {
    const decodedData = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as DecodedToken;

    const user = await User.findById(decodedData._id);

    if (!user) {
      return next(new ErrorHandler("User not found ", 404));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
};

export { isAuthenticated };
