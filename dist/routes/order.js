import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addOrder, getOrderData } from "../controllers/order.js";
const app = express();
// After here user must be logged in to access the routes
app.use(isAuthenticated);
app.post("/addorder", addOrder);
app.get("/myorderdata", getOrderData);
export default app;
