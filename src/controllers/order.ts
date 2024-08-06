import { NextFunction, Request, Response } from "express";
import { Order } from "../models/orders";
import { UserDocument } from "../models/user";

const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as UserDocument;
    const email = user?.email;
    const { order_data, order_date } = req.body;

    if (!email || !order_data || !order_date) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    const formattedOrderData = {
      Order_date: order_date,
      items: order_data.map((item: any) => ({
        categoryName: item.categoryName,
        name: item.name,
        img: item.img,
        options: item.options,
        description: item.description,
      })),
    };

    const existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      const newOrder = new Order({
        email,
        order_data: [formattedOrderData],
      });
      await newOrder.save();
    } else {
      const existingOrderDate = existingOrder.order_data.find(
        (order) => order.Order_date === order_date,
      );

      if (existingOrderDate) {
        existingOrderDate.items.push(...formattedOrderData.items);
      } else {
        existingOrder.order_data.push(formattedOrderData);
      }

      await existingOrder.save();
    }

    res
      .status(201)
      .json({ success: true, message: "Order created successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    } else {
      console.error("Unexpected error", error);
      res.status(500).json({ success: false, message: "Unexpected Error" });
    }
  }
};

const getOrderData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as UserDocument;
    const email = user?.email;

    if (!email) {
      res.status(400).json({ success: false, message: "Email is required" });
      return;
    }

    const orderData = await Order.findOne({ email });

    if (!orderData) {
      res.status(404).json({ success: false, message: "No orders found" });
      return;
    }

    res.status(200).json({ success: true, orderData });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    } else {
      console.error("Unexpected error", error);
      res.status(500).json({ success: false, message: "Unexpected Error" });
    }
  }
};

export { addOrder, getOrderData };
