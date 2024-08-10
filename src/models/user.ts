import bcrypt from "bcryptjs";
import mongoose, { Document, Schema, model } from "mongoose";

// Interface extending Mongoose Document
interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const schema = new Schema<UserDocument>(
  {
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
  },
  {
    timestamps: true,
  },
);

schema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (!this.password) return next(new Error("Password is required"));

  try {
    // Hash the password before saving
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    // Handle errors during hashing
    next(err as Error);
  }
});

export const User = mongoose.models.User || model<UserDocument>("User", schema);
