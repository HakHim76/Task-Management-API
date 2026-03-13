require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

app.get("/", async (req, res) => {});

const tasksRouter = require("./routes/tasks");
app.use("/tasks", tasksRouter);

const PORT = process.env.PORT;

async function startServer() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("mongo up and running sir!!");
    const message = `listening on port:${PORT}`;
    app.listen(PORT, () => {
      console.log(message);
    });
  } catch (err) {
    console.log("mongo conncection failed miserably", err.message);
    process.exit(1);
  }
}

startServer();
