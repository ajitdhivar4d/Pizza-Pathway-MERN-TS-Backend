"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const optionsSchema = new mongoose_1.Schema({
    half: { type: String, required: true },
    full: { type: String, required: true },
});
const orderItemSchema = new mongoose_1.Schema({
    categoryName: { type: String, required: true },
    name: { type: String, required: true },
    img: { type: String, required: true },
    options: { type: optionsSchema, required: true },
    description: { type: String, required: true },
});
const orderDataSchema = new mongoose_1.Schema({
    Order_date: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
});
const schema = new mongoose_1.Schema({
    email: { type: String, required: true },
    order_data: { type: [orderDataSchema], required: true },
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt
});
exports.Order = mongoose_1.default.models.Order || (0, mongoose_1.model)("Order", schema);
