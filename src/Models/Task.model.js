import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
 
});
const TaskModel = mongoose.model("tasks", TaskSchema);
export default TaskModel;
