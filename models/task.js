const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "in progess", "done"],
    },

    priority: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
