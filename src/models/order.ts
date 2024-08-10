import mongoose, { model, Schema } from "mongoose";

const orderItemSchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  option: {
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderDataSchema = new Schema({
  orderDate: {
    type: String,
    required: true,
  },
  items: {
    type: [orderItemSchema],
    required: true,
  },
});

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    orderData: {
      type: [orderDataSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = mongoose.models.Order || model("Order", schema);
