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
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "in-progess", "done"],
    },

    priority: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
      max: 5,
    },
    // dueDate: {
    //   type: Date,
    //   required: true
    // }
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
