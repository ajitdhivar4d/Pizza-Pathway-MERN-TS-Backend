import bcrypt from "bcryptjs";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility-class.js";
const newUser = TryCatch(async (req, res, next) => {
    const { name, email, password } = req.body;
    const existsUser = await User.findOne({ email });
    if (existsUser)
        return next(new ErrorHandler("User already exists", 409));
    if (!name || !email || !password)
        return next(new ErrorHandler("All fields required", 400));
    const user = new User({
        name,
        email,
        password,
    });
    await user.save();
    // const vUser = { _id: user._id, name: user.name, email: user.email };
    sendToken(res, user, 201, "User created");
});
const loginUser = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new ErrorHandler("All fields required", 400));
    const user = await User.findOne({ email }).select("+password");
    if (!user)
        return next(new ErrorHandler("Invalid username or Password", 404));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return next(new ErrorHandler("Invalid username or Password", 404));
    // const vUser = { _id: user._id, name: user.name, email: user.email };
    sendToken(res, user, 200, `Welcome Back ,${user.name}`);
});
const logoutUser = async (req, res, next) => {
    try {
        res
            .status(200)
            .cookie("user-token", "", { ...cookieOptions, maxAge: 0 })
            .json({
            success: true,
            message: "User logged out",
        });
    }
    catch (err) {
        next(err);
    }
};
const getMyProfile = TryCatch(async (req, res, next) => {
    if (!req.user)
        return next(new ErrorHandler("User not found", 404));
    res.status(200).json({
        success: true,
        user: req.user,
    });
});
export { getMyProfile, loginUser, logoutUser, newUser };
