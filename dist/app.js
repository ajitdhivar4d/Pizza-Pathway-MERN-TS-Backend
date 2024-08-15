import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { corsOptions } from "./constants/config.js";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";
// Importing Routes
import foodRoute from "./routes/food.js";
import orderRoute from "./routes/order.js";
import userRoute from "./routes/user.js";
config({ path: "./.env" });
const mongoURI = process.env.MONGO_URI || "";
const port = process.env.PORT || 3000;
connectDB(mongoURI);
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/home", (req, res) => {
    res.json({ message: "Welcome to Pizza Pathway!" });
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/food", foodRoute);
app.use("/api/v1/order", orderRoute);
app.use(errorMiddleware);
// Start the Server
app.listen(port, () => console.log(`Server is running on port ${port}`));
