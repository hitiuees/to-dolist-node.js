import mongoose, { Schema, Document } from 'mongoose';

// Interface to define the structure of a Task document
export interface ITask extends Document {
taskid:string
  content: string;
  isCompleted: boolean;
}

// Define the schema for Task
const TaskSchema: Schema = new Schema({
taskid:{type: String,required: true,unique:true},
  content: { type: String, required: true },
  isCompleted: { type: Boolean, default: false }
});

// Create and export the Mongoose model for Task
const Tasksmodel = mongoose.model<ITask>('Task', TaskSchema);
export default Tasksmodel;