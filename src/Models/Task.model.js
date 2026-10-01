import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
 username:{
type: String,
required: true
  },
 
});
const TaskModel = mongoose.model("tasks", TaskSchema);
export default TaskModel;
