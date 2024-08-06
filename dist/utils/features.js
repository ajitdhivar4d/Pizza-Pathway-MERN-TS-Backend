"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieOptions = exports.sendToken = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: true,
    httpOnly: true,
    secure: true,
};
exports.cookieOptions = cookieOptions;
const connectDB = (uri) => {
    mongoose_1.default
        .connect(uri, { dbName: "PizzaPathway" })
        .then((data) => console.log(`Connected to DB: ${data.connection.host} `))
        .catch((err) => {
        throw err;
    });
};
exports.connectDB = connectDB;
const sendToken = (res, user, code, message) => {
    const jwtSecret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, jwtSecret);
    return res.status(code).cookie("user-token", token, cookieOptions).json({
        success: true,
        user,
        message,
    });
};
exports.sendToken = sendToken;
