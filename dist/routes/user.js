"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const validators_1 = require("../lib/validators");
const auth_1 = require("../middlewares/auth");
const app = express_1.default.Router();
app.post("/newuser", (0, validators_1.registerValidator)(), validators_1.validateHandler, user_1.newUser);
app.post("/loginuser", (0, validators_1.loginValidator)(), validators_1.validateHandler, user_1.loginUser);
// After here user must be logged in to access the routes
app.use(auth_1.isAuthenticated);
app.get("/logoutuser", user_1.logoutUser);
app.get("/getmyprofile", user_1.getMyProfile);
exports.default = app;
