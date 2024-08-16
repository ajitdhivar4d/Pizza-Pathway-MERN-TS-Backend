import { NextFunction, Request, Response } from "express";
import { Order } from "../models/order.js";
import { ErrorHandler } from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";

const addOrder = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const email = user?.email;
    const { orderData, date } = req.body;

    if (!email || !orderData || !date)
      return next(new ErrorHandler("All fields are required", 400));

    const formattedOrderData = {
      orderDate: date,
      items: orderData.map((item: any) => ({
        categoryName: item.categoryName,
        name: item.name,
        img: item.img,
        option: item.option,
        description: item.description,
        quantity: item.quantity || 1,
      })),
    };

    const existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      const newOrder = new Order({
        email,
        orderData: [formattedOrderData],
      });
      await newOrder.save();
    } else {
      const existingOrderDate = existingOrder.orderData.find(
        (order: any) => order.orderDate === date,
      );

      if (existingOrderDate) {
        existingOrderDate.items.push(...formattedOrderData.items);
      } else {
        existingOrder.orderData.push(formattedOrderData);
      }

      await existingOrder.save();
    }

    return res
      .status(201)
      .json({ success: true, message: "Order created successfully" });
  },
);

const getOrderData = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const email = user?.email;

    if (!email)
      return next(
        new ErrorHandler("You must be logged in to view order details", 401),
      );

    const orderData = await Order.findOne({ email });

    if (!orderData) return next(new ErrorHandler("No orders found", 404));

    res.status(200).json({ success: true, orderData });
  },
);

export { addOrder, getOrderData };
