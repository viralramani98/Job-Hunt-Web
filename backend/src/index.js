import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./cpmponents/config/ConnectDB.js";
import router from "./routes/route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",  // your frontend
    credentials: true,              // allow cookies/auth headers
  })
);

// connect DB
connectDB();

// api routes
app.use("/api/v1", router);

// start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
