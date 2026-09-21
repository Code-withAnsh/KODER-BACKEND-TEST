import TaskModel from "../Models/Task.model.js";

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
    });

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
    const tasks = await TaskModel.find();
    return res.status(200).json({
      message: "tasks fetched succesfully",
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

    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "task not found",
      });
    }

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

    if (!updatedTask) {
      return res.status(404).json({
        message: "task not found",
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
    
    const task = await TaskModel.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "task not found",
      });
    }

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





