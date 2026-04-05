require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()

// cors config
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))
//app.options("/*", cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log("Request:", req.method, req.url)
    next()
})

const activityRoutes = require("./server/routes/activity")
console.log("ROUTES LOADED:", activityRoutes)
//app.use(express.json())
app.use("/api/activities", activityRoutes)

// routes
app.use("/api/auth", require("./server/routes/auth"))
app.use("/api/profile", require("./server/routes/profileRoutes"))
// guests search for users
app.use("/api/search", require("./server/routes/searchRoutes"))
// updating activity
console.log("REGISTERING ACTIVITY ROUTES")
// app.use("/api/activities", require("./server/routes/activity"))

// test route
app.get("/", (req, res) => {
    res.send("hello world")
})

// mongodb
mongoose.connect("mongodb+srv://xcjiaalilin_db_user:nuszar-nyBhi1-gintun@cluster0.sttsczj.mongodb.net/?appName=Cluster0")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

// start server
app.listen(5000, () => {
    console.log("Server is running")
})