require('dotenv').config()

const express = require('express')

//express app
const app = express()

app.get("/", (req, res) => {

    res.json({msg: "welcome to task planner"})
})

//listen for port number requests
app.listen(process.env.PORT, () => {
    console.log("listening on port",process.env.PORT);
});

