require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require("./routes/task");
const reportRoutes = require('./routes/report');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/report', reportRoutes);
app.use('/api/tasks', taskRoutes);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Task Planner" });
});

mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to DB and listening on port", PORT);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
