import TaskModel from "../Models/Task.model.js";
import mongoose from "mongoose";

async function createTask(req, res) {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "title is required",
      });
    }

    const task = await TaskModel.create({
      title,
      user: req.user.id,
      username: req.user.username,
    });

    await task.populate("user", "username email");

    return res.status(201).json({
      message: "task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "task creation failed",
    });
  }
}
async function getAllTasks(req, res) {
  try {
    const tasks = await TaskModel.find({ user: req.user }).populate(
      "user",
      "username email"
    );
    return res.status(200).json({
      message: "tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "failed to retrieve tasks",
    });
  }
}
// lets delete the task

async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    const task = await TaskModel.findById(id);
    //task have user id and req.user is the user id of the logged in user, we need to check if they are same or not
    // if they are not same then we need to return 403 forbidden

    if (!task) {
      return res.status(404).json({
        message: "task not found",
      });
    }

if(task.user?.toString() !== req.user.id){
  return res.status(403).json({
    message: "only the task creator can delete this task",
  });
}

    const deletedTask = await TaskModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "failed to delete task",
    });
  }
}
async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "title is required",
      });
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({
        message: "task not found",
      });
    }

    if (task.user?.toString() !== req.user.id) {
      return res.status(403).json({
        message: "only the task creator can update this task",
      });
    }

  
    return res.status(200).json({
      message: "task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "failed to update task",
    });
  }
}
async function getTaskById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "invalid task id",
      });
    }

    const task = await TaskModel.findById(id);


    if (!task) {
      return res.status(404).json({
        message: "task not found",
      });
    }
    if (task.user?.toString() !== req.user.id) {
      return res.status(403).json({
        message: "only the task creator can view this task",
      });
    }

    await task.populate("user", "username email");

    return res.status(200).json({
      message: "task fetched successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "failed to fetch task",
    });
  }
}   

export default { createTask, getAllTasks, deleteTask, updateTask, getTaskById };
