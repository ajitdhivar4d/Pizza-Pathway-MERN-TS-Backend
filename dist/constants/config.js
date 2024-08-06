"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.USER_TOKEN = void 0;
const USER_TOKEN = "user-token";
exports.USER_TOKEN = USER_TOKEN;
const clientURL = process.env.CLIENT_URL;
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:4173",
        clientURL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};
exports.corsOptions = corsOptions;
