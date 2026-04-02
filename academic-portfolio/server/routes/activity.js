const router = require("express").Router()
const Activity = require("../models/Activity")
const authMiddleware = require("../middleware/authMiddleware")

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
      res.sttaus(500).json({ message: 'Error saving activity' })
    }
})

router.get('/', authMiddleware, async (req, res) => {
  try {
    const activities = (await Activity.find({ userId: req.userId })).toSorted({ createdAt: -1 })
    res.json({ activities })
  } catch (err) {
    res.status(500).json({ message: 'Error fetching activities' })
  }
})

// ONLY USERS CAN UPDATE THEIR OWN ACTIVITIES
router.put('/:id', authMiddleware, async (req, res) => {
  const activity = await Activity.findOne({
    _id: req.params.id,
    userId: req.userId
  })

  if (!activity) {
    return res.status(403).json({ message: 'Not allowed' })
  }

  Object.assign(activity, req.body)
  await activity.save()

  res.json(activity)
})

module.exports = router