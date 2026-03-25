const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// mongodb
mongoose.connect("mongodb+srv://xcjiaalilin_db_user:nuszar-nyBhi1-gintun@cluster0.sttsczj.mongodb.net/?appName=Cluster0")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

// routes
const authRoutes = require("./server/routes/auth")
app.use("/api/auth", authRoutes)

// test route
app.get('/', (req, res) => {
    res.render("hello world")
})

// start server
app.listen(5000, () => {
    console.log("Server is running")
})