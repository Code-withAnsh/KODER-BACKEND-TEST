import express from "express";
import taskController from "../Controllers/task.controller.js";
import requireAuth from "../middleware/auth.middleware.js";

const router = express.Router();
router.delete("/:id", requireAuth, taskController.deleteTask);
router.post("/", requireAuth, taskController.createTask);
router.get("/", requireAuth, taskController.getAllTasks);
router.get("/:id", requireAuth, taskController.getTaskById);
router.put("/:id", requireAuth, taskController.updateTask);
export default router;
