import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/auth.routes.js";
import taskRoutes from "./Routes/task.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
export default app;
