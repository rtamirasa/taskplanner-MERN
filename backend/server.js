require('dotenv').config()

const express = require('express')
const taskRoutes = require("./routes/task")
const mongoose = require('mongoose')
//express app
const app = express()

//middlewareGG

app.use(express.json())

app.use((req, res, next) => {

    console.log(req.path, req.method)
    next()
})
//routes
app.use('/api/tasks', taskRoutes)

//connceting to database


mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("connected to db and listening on port",process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })


app.get("/", (req, res) => {

    res.json({msg: "welcome to task planner"})
})

//listen for port number requests
//app.listen(process.env.PORT, () => {
//    console.log("connected to db and listening on port",process.env.PORT);
//});

