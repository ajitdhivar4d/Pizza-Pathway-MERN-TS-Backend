"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.validateHandler = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
const utility_1 = require("../utils/utility");
const validateHandler = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    const errorMessages = errors
        .array()
        .map((error) => error.msg)
        .join(", ");
    if (errors.isEmpty())
        return next();
    else
        next(new utility_1.ErrorHandler(errorMessages, 400));
};
exports.validateHandler = validateHandler;
const registerValidator = () => [
    (0, express_validator_1.body)("name", "Please Enter Name").notEmpty(),
    (0, express_validator_1.body)("email", "Please Enter  Email").notEmpty(),
    (0, express_validator_1.body)("password", "Please Enter a Password ").notEmpty(),
];
exports.registerValidator = registerValidator;
const loginValidator = () => [
    (0, express_validator_1.body)("email", "Please Enter email").notEmpty(),
    (0, express_validator_1.body)("password", "Please Enter password").notEmpty(),
];
exports.loginValidator = loginValidator;
