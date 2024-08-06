"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../controllers/order");
const auth_1 = require("../middlewares/auth");
const app = (0, express_1.default)();
// After here user must be logged in to access the routes
app.use(auth_1.isAuthenticated);
app.post("/orderdata", order_1.addOrder);
app.get("/myOrderData", order_1.getOrderData);
exports.default = app;
