import { hash } from "bcryptjs";
import mongoose, { Document, Schema, model } from "mongoose";

export interface UserDocument extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  isModified: (path: string) => boolean;
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
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  },
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (!this.password) return next(new Error("Password is required"));

  try {
    // Type assertion for `this` to `UserDocument`
    this.password = await hash(this.password, 10);
    next();
  } catch (err) {
    next(err as Error);
  }
});

export const User = mongoose.models.User || model<UserDocument>("User", schema);
