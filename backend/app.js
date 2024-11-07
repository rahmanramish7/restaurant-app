// backend/app.js
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/reservation", reservationRouter);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use(errorMiddleware);

export default app;