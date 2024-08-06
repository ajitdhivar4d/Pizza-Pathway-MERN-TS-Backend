"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./constants/config");
const error_1 = require("./middlewares/error");
const food_1 = __importDefault(require("./routes/food"));
const order_1 = __importDefault(require("./routes/order"));
const user_1 = __importDefault(require("./routes/user"));
const features_1 = require("./utils/features");
dotenv_1.default.config({ path: "./.env" });
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
(0, features_1.connectDB)(mongoURI);
const app = (0, express_1.default)();
// Using Middleware Here
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(config_1.corsOptions));
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/food", food_1.default);
app.use("/api/v1/order", order_1.default);
app.use(error_1.errorMiddleware);
// Start the Server
app.listen(port, () => console.log(`Server is running on port ${port}`));
