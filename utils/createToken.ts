import jwt from "jsonwebtoken";
import { Response } from "express";
import mongoose from "mongoose";

const generateToken = (
  res: Response,
  userId: mongoose.Types.ObjectId,
): string => {
  const jwtSecret = process.env.JWT_SECRET as string;

  const token = jwt.sign({ userId: userId.toHexString() }, jwtSecret, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default generateToken;
