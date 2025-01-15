require('dotenv').config()

const express = require('express')
const taskRoutes = require("./routes/task")
//express app
const app = express()

//middleware

app.use(express.json())

app.use((req, res, next) => {

    console.log(req.path, req.method)
    next()
})

app.use('/api/tasks', taskRoutes)

app.get("/", (req, res) => {

    res.json({msg: "welcome to task planner"})
})

//listen for port number requests
app.listen(process.env.PORT, () => {
    console.log("listening on port",process.env.PORT);
});

