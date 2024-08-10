import jwt from "jsonwebtoken";
import { USER_TOKEN } from "../constants/config.js";
import { ErrorHandler } from "../utils/utility-class.js";
import { User } from "../models/user.js";
const isAuthenticated = async (req, res, next) => {
    const token = req.cookies[USER_TOKEN];
    if (!token)
        return next(new ErrorHandler("Please login to access this Route", 401));
    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedData.id);
        if (!user) {
            return next(new ErrorHandler("User not found ", 404));
        }
        req.user = user;
        next();
    }
    catch (error) {
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
};
export { isAuthenticated };
