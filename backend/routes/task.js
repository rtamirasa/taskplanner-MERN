//routes wanted: get, post, get task id, delete task id, patch task id (for now)
const express = require("express");
const Task = require('../models/TaskModels')

const router = express.Router();

// Get all tasks
router.get("/", (req, res) => {
    res.json({ mssg: "GET all tasks" });
});

// GET single task
router.get("/:id", (req, res) => {
    res.json({ mssg: "GET single task" });
});

// POST a new task
router.post("/", async (req, res) => {
    const { title, description, dueDate, category, status } = req.body;
    try{
        const task = await Task.create({title,description, dueDate,category, status })
        res.status(200).json(task)
    }catch(error){
        res.status(400).json({error: error.message})
    }
  //  res.json({ mssg: "POST a new task" });
});

// DELETE
router.delete("/:id", (req, res) => {
    res.json({ mssg: "DELETE a task" });
});

// UPDATE a task
router.patch("/:id", (req, res) => {
    res.json({ mssg: "UPDATE a task" });
});

//router.get("/hello", () => {});

module.exports = router;