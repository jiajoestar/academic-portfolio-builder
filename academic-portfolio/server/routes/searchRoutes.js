// guests can search for registered users
const router = require("express").Router()
const User = require("../models/User")

router.get("/", async (req,res) => {
    const query = req.query.q

    if (!query) return res.json([])
    
    const users = await User.find({
        name: { $regex: query, $options: "i" }
    }).select("_id name")

    res.json(users)
})

module.exports = router