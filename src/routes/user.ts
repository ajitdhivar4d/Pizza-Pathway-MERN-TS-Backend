import express from "express";
import {
  getMyProfile,
  loginUser,
  logoutUser,
  newUser,
} from "../controllers/user";
import {
  loginValidator,
  registerValidator,
  validateHandler,
} from "../lib/validators";
import { isAuthenticated } from "../middlewares/auth";

const app = express.Router();

app.post("/newuser", registerValidator(), validateHandler, newUser);

app.post("/loginuser", loginValidator(), validateHandler, loginUser);

// After here user must be logged in to access the routes
app.use(isAuthenticated);

app.get("/logoutuser", logoutUser);

app.get("/getmyprofile", getMyProfile);

export default app;
