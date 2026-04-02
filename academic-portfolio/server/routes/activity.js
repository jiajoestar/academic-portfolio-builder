const router = require("express").Router()
const Activity = require("../models/Activity")
const authMiddleware = require("../middleware/authMiddleware")

// SAVING ACTIVITY DRAFT
router.post('/', (req, res) => {
    console.log(req.body)
    res.json({ message: 'Saved!' })
})

// ONLY USERS CAN UPDATE THEIR OWN ACTIVITIES
router.put("/:id", authMiddleware, async (req, res) => {
  const activity = await Activity.findOne({
    _id: req.params.id,
    userId: req.userId
  })

  if (!activity) {
    return res.status(403).json({ message: "Not allowed" })
  }

  Object.assign(activity, req.body)
  await activity.save()

  res.json(activity)
})

module.exports = router