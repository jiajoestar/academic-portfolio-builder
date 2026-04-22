const path = require('path')
const dotenv = require('dotenv')
const result = dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('dotenv error:', result.error || 'none');
console.log('env path:', path.resolve(__dirname, '.env'));
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS exists?', !!process.env.EMAIL_PASS);
console.log('JWT_SECRET exists?', !!process.env.JWT_SECRET);
console.log('MONGO_URI exists?', !!process.env.MONGO_URI);

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
//app.use("/api/search", require("./server/routes/searchRoutes"))
app.use("/api/users", require("./server/routes/userRoutes"))
// updating activity
console.log("REGISTERING ACTIVITY ROUTES")
// app.use("/api/activities", require("./server/routes/activity"))

// test route
app.get("/", (req, res) => {
    res.send("hello world")
})

// mongodb
mongoose.connect('mongodb+srv://xcjiaalilin_db_user:uwBMTHDEdN.W5rj@cluster0.sttsczj.mongodb.net/?appName=Cluster0')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

// start server
app.listen(5000, () => {
    console.log("Server is running")
})