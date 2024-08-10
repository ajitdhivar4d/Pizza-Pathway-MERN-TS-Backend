// const clientURL = process.env.CLIENT_URL || "";
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:4173",
//   "https://pizza-pathway-mern-ts-frontend.vercel.app",
//   clientURL,
// ].filter((origin): origin is string => origin !== "" && origin !== undefined);
const corsOptions = {
    origin: "https://pizza-pathway-mern-ts-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
const USER_TOKEN = "user-token";
export { USER_TOKEN, corsOptions };
