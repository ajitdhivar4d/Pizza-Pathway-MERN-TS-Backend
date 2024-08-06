import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Response } from "express";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: true,
  httpOnly: true,
  secure: true,
};

const connectDB = (uri: string) => {
  mongoose
    .connect(uri, { dbName: "PizzaPathway" })
    .then((data) => console.log(`Connected to DB: ${data.connection.host} `))
    .catch((err) => {
      throw err;
    });
};

const sendToken = (
  res: Response,
  user: mongoose.Types.ObjectId,
  code: number,
  message: string,
) => {
  const jwtSecret = process.env.JWT_SECRET as string;

  const token = jwt.sign({ _id: user._id }, jwtSecret);

  return res.status(code).cookie("user-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

export { connectDB, sendToken, cookieOptions };
