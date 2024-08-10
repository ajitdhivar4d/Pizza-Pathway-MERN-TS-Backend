import express from "express";
import {
  getMyProfile,
  loginUser,
  logoutUser,
  newUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.post("/newuser", newUser);

app.post("/loginuser", loginUser);

// After here user must be logged in to access the routes
app.use(isAuthenticated);

app.get("/logoutuser", logoutUser);

app.get("/getmyprofile", getMyProfile);

export default app;
