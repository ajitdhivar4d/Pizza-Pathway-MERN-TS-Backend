import express from "express";
import { addFoodItem, getFoodData } from "../controllers/food";

const app = express();

app.post("/addfooditem", addFoodItem);

app.get("/data", getFoodData);

export default app;
