import mongoose, { Document, model, Model, Schema } from "mongoose";

interface Options {
  half: string;
  full: string;
}

interface OrderItem {
  categoryName: string;
  name: string;
  img: string;
  options: Options;
  description: string;
}

interface OrderData {
  Order_date: string;
  items: OrderItem[];
}

export interface OrderDocument extends Document {
  email: string;
  order_data: OrderData[];
}

const optionsSchema: Schema = new Schema({
  half: { type: String, required: true },
  full: { type: String, required: true },
});

const orderItemSchema: Schema = new Schema({
  categoryName: { type: String, required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  options: { type: optionsSchema, required: true },
  description: { type: String, required: true },
});

const orderDataSchema: Schema = new Schema({
  Order_date: { type: String, required: true },
  items: { type: [orderItemSchema], required: true },
});

const schema: Schema = new Schema(
  {
    email: { type: String, required: true },
    order_data: { type: [orderDataSchema], required: true },
  },
  {
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  },
);

export const Order: Model<OrderDocument> =
  mongoose.models.Order || model<OrderDocument>("Order", schema);
