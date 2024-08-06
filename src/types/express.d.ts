import { UserDocument } from "./../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument; // Add user property to Request type
    }
  }
}
