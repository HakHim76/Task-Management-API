const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "done"],
      default: "pending",
    },

    priority: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },

    tags: {
      type: [String],
      default: [],
    },

    assignedTo: {
      type: String,
      default: null,
    },

    estimatedHours: {
      type: Number,
      min: 0,
      default: 1,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    dueDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Task", taskSchema);
