"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../constants/config");
const utility_1 = require("../utils/utility");
const user_1 = require("../models/user");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies[config_1.USER_TOKEN];
    if (!token)
        return next(new utility_1.ErrorHandler("Please login to access this Route", 401));
    try {
        const decodedData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield user_1.User.findById(decodedData._id);
        if (!user) {
            return next(new utility_1.ErrorHandler("User not found ", 404));
        }
        req.user = user;
        next();
    }
    catch (error) {
        return next(new utility_1.ErrorHandler("Invalid or expired token", 401));
    }
});
exports.isAuthenticated = isAuthenticated;
