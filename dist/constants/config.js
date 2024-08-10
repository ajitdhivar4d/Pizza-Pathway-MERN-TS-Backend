const clientURL = process.env.CLIENT_URL || "";
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:4173",
    clientURL,
].filter((origin) => origin !== "" && origin !== undefined);
const corsOptions = {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
const USER_TOKEN = "user-token";
export { USER_TOKEN, corsOptions };
