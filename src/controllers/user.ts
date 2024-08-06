import { compare } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import { User } from "../models/user";
import { cookieOptions, sendToken } from "../utils/features";
import { ErrorHandler } from "../utils/utility";

interface userProps {
  name: string;
  email: string;
  password: string;
}

const newUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password }: userProps = req.body;

    const existsUser = await User.findOne({ email });

    if (existsUser) return next(new ErrorHandler("User already exists", 409));

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    sendToken(res, user, 201, "User created");
  },
);

const loginUser = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid username or Password", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return next(new ErrorHandler("Invalid username or Password", 404));

  sendToken(res, user, 200, `Welcome Back ,${user.name}`);
});

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(200)
      .cookie("user-token", "", { ...cookieOptions, maxAge: 0 })
      .json({
        success: true,
        message: "User logged out",
      });
  } catch (err) {
    next(err);
  }
};

const getMyProfile = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ErrorHandler("User not found", 404));

    res.status(200).json({
      success: true,
      user: req.user,
    });
  },
);

export { getMyProfile, loginUser, logoutUser, newUser };
