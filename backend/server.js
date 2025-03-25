require('dotenv').config()

const express = require('express')
const cors = require('cors') 
const taskRoutes = require("./routes/task")
const mongoose = require('mongoose')
const reportRoutes = require('./routes/report');


// express app
const app = express()


app.use(cors())

// middleware to parse JSON
app.use(express.json())

app.use('/api/report', reportRoutes);
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/tasks', taskRoutes)

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Task Planner" })
})

// connect to MongoDB
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
