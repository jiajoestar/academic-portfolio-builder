const path = require('path')
const dotenv = require('dotenv')
const result = dotenv.config({ path: path.resolve(__dirname, '.env') })

console.log('dotenv error:', result.error || 'none')
console.log('env path:', path.resolve(__dirname, '.env'))
console.log('EMAIL_USER:', process.env.EMAIL_USER)
console.log('EMAIL_PASS exists?', !!process.env.EMAIL_PASS)
console.log('JWT_SECRET exists?', !!process.env.JWT_SECRET)
console.log('MONGO_URI exists?', !!process.env.MONGO_URI)

require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()

// cors config
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://caseportfolio.onrender.com"
    ],

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

const activityRoutes = require("./routes/activity")
console.log("ROUTES LOADED:", activityRoutes)
//app.use(express.json())
app.use("/api/activities", activityRoutes)

// routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/profile", require("./routes/profileRoutes"))
// guests search for users
//app.use("/api/search", require("./server/routes/searchRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
// updating activity
console.log("REGISTERING ACTIVITY ROUTES")
// app.use("/api/activities", require("./server/routes/activity"))
app.use("/api/publications", require("./routes/publications"))

// test route
app.get("/", (req, res) => {
    res.send("hello world")
})

// mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

// start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})