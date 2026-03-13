const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// FIND TASK MIDDLEWARE
async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);

    if (task === null) {
      return res.status(404).json({ msg: "task not found" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
  res.task = task;
  next();
}

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
router.get("/:id", getTask, async (req, res) => {
  const task = res.task;
  res.status(200).json(task);
});
// CREATE A TASK
router.post("/", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
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
router.patch("/:id", getTask, async (req, res) => {
  if (req.body.title != null) {
    res.task.title = req.body.title;
  }
  if (req.body.status != null) {
    res.task.status = req.body.status;
  }
  if (req.body.priority != null) {
    res.task.priority = req.body.priority;
  }

  try {
    const updatedTask = await res.task.save();
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});
// DELETE A TASK
router.delete("/:id", getTask, async (req, res) => {
  try {
    await res.task.deleteOne();
    res.status(200).json({ msg: "task removed" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
