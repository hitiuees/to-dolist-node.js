import express from "express";
import mongoose from "mongoose";
import Tasksmodel from "./models/tasksmodel";
import cors from "cors"
const app = express();
const port = 5000;
app.use(cors({
  origin: "http://localhost:5173"
}))
app.use(express.json());

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Tasksmodel.find();
    res.status(200).send(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).send("Error fetching tasks");
  }
});

// Create a new task
app.post("/tasks", async (req, res) => {
  try {
   
    if(!req.body.content){
return res.status(400).send("missing body data")
    }
    if(!req.body.taskid){
return res.status(400).send("missing id data")
    }
    const newtask = await Tasksmodel.create(req.body);
    res.status(200).send(newtask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).send("Error creating task");
  }
});

// Delete all tasks
app.delete("/tasks", async (req, res) => {
  try {
    await Tasksmodel.deleteMany({});
    res.status(200).send("All tasks deleted");
  } catch (err) {
    console.error("Error deleting tasks:", err);
    res.status(500).send("Error deleting tasks");
  }
});
//change is completed of task
app.put("/tasks/:taskid", async (req, res) => {
  try {
    const taskId = req.params.taskid;

    // Check if taskid is empty
    if (!taskId) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    // Find the task by your custom taskid field and update it
    const updatedTask = await Tasksmodel.findOneAndUpdate(
      { taskid: taskId }, // Query object with your custom taskid field
      req.body,           // Update data
      { new: true }       // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Return success response
    res.status(200).json({ message: 'Task updated successfully', updatedTask });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).send(err);
  }
});


// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/tasks")
  .then(() => console.log("Connected to database!"))
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
