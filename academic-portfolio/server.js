require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()

// middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())

// mongodb
mongoose.connect("mongodb+srv://xcjiaalilin_db_user:nuszar-nyBhi1-gintun@cluster0.sttsczj.mongodb.net/?appName=Cluster0")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

// routes
app.use("/api/auth", require("./server/routes/auth"))
app.use("/api/profile", require("./server/routes/profileRoutes"))
// guests search for users
app.use("/api/search", require("./server/routes/searchRoutes"))
// updating activity
app.use("/api/activities", require("./server/routes/activity"))

// test route
app.get("/", (req, res) => {
    res.send("hello world")
})

// start server
app.listen(5000, () => {
    console.log("Server is running")
})