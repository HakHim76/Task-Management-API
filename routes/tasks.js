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
    const tasks = await Task.find({}).limit(10);
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
  try {
    const task = await Task.create(req.body);

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// UPDATE A TASK
router.patch("/:id", getTask, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        msg: "Task not found",
      });
    }

    res.status(200).json(task);
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
