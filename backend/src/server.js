import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(rateLimiter);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get(/^\/?(?!api\/).*$/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(port, () => {
  connectDb();
  console.log(`server is listening on port: ${port}`);
});
