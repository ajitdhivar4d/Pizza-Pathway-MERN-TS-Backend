import mongoose, { Document, Schema, model } from "mongoose";

interface Option {
  half: number;
  full: number;
}

export interface ItemDocument extends Document {
  categoryName: string;
  name: string;
  img: string;
  options: Option[];
  description: string;
}

const optionsSchema: Schema = new Schema(
  {
    half: {
      type: String,
      required: true,
    },
    full: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const itemSchema = new Schema<ItemDocument>(
  {
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
    options: {
      type: [optionsSchema],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  },
);

export const Item =
  mongoose.models.Item || model<ItemDocument>("Item", itemSchema);
