const express = require("express");
const router = express.Router();
const Task = require("../models/task");

//ALL TASKS
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
// SHOW A TASK
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});
// CREATE A TASK
router.post("/", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    status: req.body.status,

    priority: req.body.priority,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// UPDATE A TASK
// DELETE A TASK

module.exports = router;
