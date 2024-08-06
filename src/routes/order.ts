import express from "express";
import { addOrder, getOrderData } from "../controllers/order";
import { isAuthenticated } from "../middlewares/auth";

const app = express();

// After here user must be logged in to access the routes
app.use(isAuthenticated);

app.post("/orderdata", addOrder);

app.get("/myOrderData", getOrderData);

export default app;
