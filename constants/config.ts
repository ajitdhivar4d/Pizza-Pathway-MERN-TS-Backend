import cors from "cors"; // Import 'cors' and its types

const clientURL = process.env.CLIENT_URL || "http://default-url.com";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  clientURL,
].filter((origin): origin is string => origin !== undefined);

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const USER_TOKEN = "user-token";

export { USER_TOKEN, corsOptions };
