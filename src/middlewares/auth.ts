import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { USER_TOKEN } from "../constants/config.js";
import { ErrorHandler } from "../utils/utility-class.js";
import { User } from "../models/user.js";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export interface DecodedToken extends JwtPayload {
  id: string;
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

    const user = await User.findById(decodedData.id);

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
