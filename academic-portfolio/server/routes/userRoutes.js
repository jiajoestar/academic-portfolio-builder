const router = require("express").Router()
const User = require("../models/User")
const Activity = require("../models/Activity")

// public user search - guests can search for users
router.get("/search", async (req, res) => {
    try {
        const q = (req.query.q || "").trim()
        console.log("SEARCH ROUTE HIT, q =", q)

        if (!q) {
            return res.json([])
        }

        const users = await User.find({
            name: { $regex: q, $options: "i" }
        })
        .select("_id name headline workplace avatar")
        .limit(10)

        console.log("FOUND USERS:", users)

        res.json(users)
    } catch (error) {
        console.error("Search users error:", error)
        res.status(500).json({ message: "Server error while searching users" })
    }
})

// public profile by user id - guests can view profiles
/*
router.get("/:id/public", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("_id name headline workplace avatar")

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const activities = await Activity.find({ user: req.params.id }).sort({ createdAt: -1 })

        res.json({ user, activities })
    } catch (error) {
        console.error("Public profile error:", error)
        res.status(500).json({ message: "Server error while fetching profile" })
    }
})
*/

router.get("/:id/public", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("_id name headline workplace avatar");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const activities = await Activity.find({
            userId: req.params.id,
            status: "published"
        }).sort({ createdAt: -1 });

        res.json({ user, activities });
    } catch (error) {
        console.error("Public profile error:", error);
        res.status(500).json({ message: "Server error while fetching profile" });
    }
});

module.exports = router