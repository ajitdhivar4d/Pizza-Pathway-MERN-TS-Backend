import bcrypt from "bcryptjs";
import mongoose, { Schema, model } from "mongoose";
const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
}, {
    timestamps: true,
});
schema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    if (!this.password)
        return next(new Error("Password is required"));
    try {
        // Hash the password before saving
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    catch (err) {
        // Handle errors during hashing
        next(err);
    }
});
export const User = mongoose.models.User || model("User", schema);
