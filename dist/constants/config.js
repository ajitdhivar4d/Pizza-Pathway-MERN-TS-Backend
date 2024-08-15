const clientURL = process.env.CLIENT_URL || "";
const allowedOrigins = [
    "https://pizza-pathway-mern-ts-frontend.vercel.app",
    clientURL,
].filter(Boolean);
const corsOptions = {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
const USER_TOKEN = "user-token";
export { USER_TOKEN, corsOptions };
