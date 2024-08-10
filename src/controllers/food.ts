import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { FoodItem } from "../models/foodItem.js";
import { ErrorHandler } from "../utils/utility-class.js";

const addFoodItem = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryName, name, img, options, description } = req.body;

    if (!categoryName || !name || !img || !options || !description)
      return next(new ErrorHandler("All fields required", 400));

    const item = new FoodItem({
      categoryName,
      name,
      img,
      options,
      description,
    });

    await item.save();

    res.status(201).json({
      success: true,
      item,
    });
  },
);

const getFoodData = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const FoodItems = await FoodItem.find();

    res.status(200).json({
      success: true,
      FoodItems,
    });
  },
);

export { addFoodItem, getFoodData };
