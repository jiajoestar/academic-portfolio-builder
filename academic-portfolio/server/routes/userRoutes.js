const router = require("express").Router()
const User = require("../models/User")

router.get("/search", async (req, res) => {
    const q = req.query.q

    const users = await User.find({
        name: { $regex: q, $options: "i" }
    })

    res.json(users)
})

module.exports = router