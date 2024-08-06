import cors, { CorsOptions } from "cors"; // Import 'cors' and its types

const USER_TOKEN = "user-token";

const clientURL = process.env.CLIENT_URL;

const corsOptions: CorsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    clientURL as string,
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export { USER_TOKEN, corsOptions };
