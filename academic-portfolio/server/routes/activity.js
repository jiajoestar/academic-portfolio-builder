const router = require("express").Router()
const Activity = require("../models/Activity")
const authMiddleware = require("../middleware/authMiddleware")

console.log("ACTIVITY ROUTES LOADED")

router.get("/test", (req,res) => {
  res.json({ ok: true })
})

// SAVING ACTIVITY DRAFT
router.post('/', authMiddleware, async (req, res) => {
    try {
      const activity = new Activity({
        ...req.body,
        userId: req.userId,
        status: req.body.status || 'draft'
      })

      await activity.save()

      res.json(activity)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error saving activity' })
    }
})

router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log("User ID:", req.userId)

    const activities = await Activity.find({ userId: req.userId }).sort({ createdAt: -1 })

    console.log("Activities from DB:", activities)

    res.json({ activities })
  } catch (err) {
    console.error("Fetch error:", err)
    res.status(500).json({ message: 'Error fetching activities' })
  }
})

// ONLY USERS CAN UPDATE THEIR OWN ACTIVITIES
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.id,
      userId: req.userId
    })

    if (!activity) {
      return res.status(403).json({ message: 'Not allowed' })
    }

    if (req.body.title !== undefined) activity.title = req.body.title
    if (req.body.type !== undefined) activity.type = req.body.type
    if (req.body.description !== undefined) activity.description = req.body.description
    if (req.body.startDate !== undefined) activity.startDate = req.body.startDate
    if (req.body.endDate !== undefined) activity.endDate = req.body.endDate
    if (req.body.status !== undefined) activity.status = req.body.status
    if (req.body.pinned !== undefined) activity.pinned = req.body.pinned
    if (req.body.details !== undefined) activity.details = req.body.details

    await activity.save()

    res.json(activity)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error updating activity' })
  }
})

// DELETING AN ACTIVITY DRAFT
router.delete('/:id', authMiddleware, async (req, res) => {
  console.log("DELETE ROUTE HIT:", req.params.id)
  const activity = await Activity.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId
  })

  if (!activity) {
    return res.status(403).json({ message: 'Not allowed' })
  }

  res.json({ message: 'Deleted' })
})

module.exports = router