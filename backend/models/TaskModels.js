const mongoose = require("mongoose")


const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true, // Task must have a title
    },
    description: {
        type: String, // Description of task
        default: "", // Default
    },
    dueDate: {
        type: Date, // Date when the task is due
        required: true,
    },
    category: {
        type: String, //Categories
        enum: ["Work", "Personal", "Health", "Others"], 
        default: "Others",
    },
    status: {
        type: String, // Task's status
        enum: ["Pending", "In Progress", "Completed"], 
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
});

taskSchema.index({ status: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ category: 1 });

module.exports = mongoose.model('Task', taskSchema);
//Tasks.find()