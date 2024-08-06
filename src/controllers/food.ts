import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import { Item, ItemDocument } from "../models/foodItem";

const addFoodItem = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryName, name, img, options, description }: ItemDocument =
      req.body;

    const item = new Item({
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
    const items = await Item.find();

    res.status(200).json({
      items,
    });
  },
);

export { addFoodItem, getFoodData };
