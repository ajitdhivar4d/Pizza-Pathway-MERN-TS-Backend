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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = exports.logoutUser = exports.loginUser = exports.getMyProfile = void 0;
const bcryptjs_1 = require("bcryptjs");
const error_1 = require("../middlewares/error");
const user_1 = require("../models/user");
const features_1 = require("../utils/features");
const utility_1 = require("../utils/utility");
const newUser = (0, error_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const existsUser = yield user_1.User.findOne({ email });
    if (existsUser)
        return next(new utility_1.ErrorHandler("User already exists", 409));
    const user = new user_1.User({
        name,
        email,
        password,
    });
    yield user.save();
    (0, features_1.sendToken)(res, user, 201, "User created");
}));
exports.newUser = newUser;
const loginUser = (0, error_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.User.findOne({ email }).select("+password");
    if (!user)
        return next(new utility_1.ErrorHandler("Invalid username or Password", 404));
    const isMatch = yield (0, bcryptjs_1.compare)(password, user.password);
    if (!isMatch)
        return next(new utility_1.ErrorHandler("Invalid username or Password", 404));
    (0, features_1.sendToken)(res, user, 200, `Welcome Back ,${user.name}`);
}));
exports.loginUser = loginUser;
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res
            .status(200)
            .cookie("user-token", "", Object.assign(Object.assign({}, features_1.cookieOptions), { maxAge: 0 }))
            .json({
            success: true,
            message: "User logged out",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.logoutUser = logoutUser;
const getMyProfile = (0, error_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return next(new utility_1.ErrorHandler("User not found", 404));
    res.status(200).json({
        success: true,
        user: req.user,
    });
}));
exports.getMyProfile = getMyProfile;
