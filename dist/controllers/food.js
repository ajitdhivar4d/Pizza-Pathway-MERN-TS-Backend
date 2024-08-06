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
exports.getFoodData = exports.addFoodItem = void 0;
const error_1 = require("../middlewares/error");
const foodItem_1 = require("../models/foodItem");
const addFoodItem = (0, error_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName, name, img, options, description } = req.body;
    const item = new foodItem_1.Item({
        categoryName,
        name,
        img,
        options,
        description,
    });
    yield item.save();
    res.status(201).json({
        success: true,
        item,
    });
}));
exports.addFoodItem = addFoodItem;
const getFoodData = (0, error_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield foodItem_1.Item.find();
    res.status(200).json({
        items,
    });
}));
exports.getFoodData = getFoodData;
