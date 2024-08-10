import mongoose, { Schema, model } from "mongoose";
const optionSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, { _id: false });
const schema = new Schema({
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
    options: [optionSchema],
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
export const FoodItem = mongoose.models.FoodItem || model("FoodItem", schema);
