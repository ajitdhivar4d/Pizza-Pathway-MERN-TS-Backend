"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (res, userId) => {
    const jwtSecret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ userId: userId.toHexString() }, jwtSecret, {
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
exports.default = generateToken;
