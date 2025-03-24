require('dotenv').config()

const express = require('express')
const cors = require('cors') // ✅ import CORS
const taskRoutes = require("./routes/task")
const mongoose = require('mongoose')

// express app
const app = express()

// ✅ middleware to allow frontend requests
app.use(cors())

// middleware to parse JSON
app.use(express.json())

// custom logger middleware (optional)
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/tasks', taskRoutes)

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Task Planner" })
})

// connect to MongoDB and start server
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
