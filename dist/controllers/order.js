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
exports.getOrderData = exports.addOrder = void 0;
const orders_1 = require("../models/orders");
const addOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const email = user === null || user === void 0 ? void 0 : user.email;
        const { order_data, order_date } = req.body;
        if (!email || !order_data || !order_date) {
            res
                .status(400)
                .json({ success: false, message: "All fields are required" });
            return;
        }
        const formattedOrderData = {
            Order_date: order_date,
            items: order_data.map((item) => ({
                categoryName: item.categoryName,
                name: item.name,
                img: item.img,
                options: item.options,
                description: item.description,
            })),
        };
        const existingOrder = yield orders_1.Order.findOne({ email });
        if (!existingOrder) {
            const newOrder = new orders_1.Order({
                email,
                order_data: [formattedOrderData],
            });
            yield newOrder.save();
        }
        else {
            const existingOrderDate = existingOrder.order_data.find((order) => order.Order_date === order_date);
            if (existingOrderDate) {
                existingOrderDate.items.push(...formattedOrderData.items);
            }
            else {
                existingOrder.order_data.push(formattedOrderData);
            }
            yield existingOrder.save();
        }
        res
            .status(201)
            .json({ success: true, message: "Order created successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message,
            });
        }
        else {
            console.error("Unexpected error", error);
            res.status(500).json({ success: false, message: "Unexpected Error" });
        }
    }
});
exports.addOrder = addOrder;
const getOrderData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const email = user === null || user === void 0 ? void 0 : user.email;
        if (!email) {
            res.status(400).json({ success: false, message: "Email is required" });
            return;
        }
        const orderData = yield orders_1.Order.findOne({ email });
        if (!orderData) {
            res.status(404).json({ success: false, message: "No orders found" });
            return;
        }
        res.status(200).json({ success: true, orderData });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message,
            });
        }
        else {
            console.error("Unexpected error", error);
            res.status(500).json({ success: false, message: "Unexpected Error" });
        }
    }
});
exports.getOrderData = getOrderData;
