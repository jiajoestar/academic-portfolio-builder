const router = require("express").Router()
const User = require("../models/User")
const Activity = require("../models/Activity")
const authMiddleware = require("../middleware/authMiddleware")

// GET PROFILE
router.get('/', authMiddleware, async (req, res) => {
    try {
        console.log("req.userId:", req.userId)

        const user = await User.findById(req.userId)

        console.log("FOUND USER:", user)

        const activities = await Activity.find({
            userId: req.userId,
            status: "published"
        })

        res.json({ user, activities })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
})

// UPDATE PROFILE
router.put('/', authMiddleware, async (req, res) => {
    const updated = await User.findByIdAndUpdate(
        req.userId,
        req.body,
        { new: true }
    )

    res.json(updated)
})

// PIN ACTIVITIES
router.put("/pin", authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId)
    user.pinnedActivities = req.body.pinned
    await user.save()

    res.json(user)
});

module.exports = router

// PUBLIC PROFILE (when user creates sharable link)
router.get("/public/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        const activities = await Activity.find({
            userId: req.params.id,
            status: "published"
        })

        res.json({ user, activities })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})