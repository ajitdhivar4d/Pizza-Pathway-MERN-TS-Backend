import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { corsOptions } from "./constants/config";
import { errorMiddleware } from "./middlewares/error";
import foodRoute from "./routes/food";
import orderRoute from "./routes/order";
import userRoute from "./routes/user";
import { connectDB } from "./utils/features";

dotenv.config({ path: "./.env" });

const mongoURI = process.env.MONGO_URI as string;
const port = process.env.PORT || 3000;

connectDB(mongoURI);

const app: any = express();

// Using Middleware Here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/food", foodRoute);
app.use("/api/v1/order", orderRoute);

app.use(errorMiddleware);

// Start the Server
app.listen(port, () => console.log(`Server is running on port ${port}`));
