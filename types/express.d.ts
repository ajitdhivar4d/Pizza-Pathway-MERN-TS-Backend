import { UserDocument } from "./../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument; // Add user property to Request type
    }
  }
}

export interface OrderItem {
  categoryName: string;
  name: string;
  img: string;
  options: {
    half: string;
    full: string;
  }[];
  description: string;
}

export interface OrderData {
  Order_date: string;
  items: OrderItem[];
}
