//routes wanted: get, post, get task id, delete task id, patch task id (for now)
const express = require("express");
const Task = require('../models/TaskModels')
const{
    getTask,
    createTask,
    getTasks,
    deleteTask,
    updateTask


} = require("../controllers/taskController")

const router = express.Router();

// Get all tasks
router.get("/", getTasks)

// GET single task
router.get("/:id", getTask)

// POST a new task
router.post("/", createTask)

// DELETE
router.delete("/:id", deleteTask)

// UPDATE a task
router.patch("/:id", updateTask);

//router.get("/hello", () => {});

module.exports = router;