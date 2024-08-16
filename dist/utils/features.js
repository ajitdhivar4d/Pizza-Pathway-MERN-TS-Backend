import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "PRODUCTION",
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
};
export const connectDB = (uri) => {
    mongoose
        .connect(uri, { dbName: "PizzaPathway" })
        .then((c) => console.log(`DB Connected to ${c.connection.host}`))
        .catch((e) => console.log(e));
};
const sendToken = (res, user, code, message) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ id: String(user._id) }, jwtSecret);
    return res.status(code).cookie("user-token", token, cookieOptions).json({
        success: true,
        user,
        message,
    });
};
export { cookieOptions, sendToken };
