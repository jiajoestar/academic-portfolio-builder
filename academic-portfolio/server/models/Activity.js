const mongoose = require("mongoose")

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  type: String,
  title: String,
  description: String,
  pinned: { type: Boolean, default: false },
  reviewType: String,
  day: String,
  month: String,
  year: String,

  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },

}, {
  timestamps: true
})

module.exports = mongoose.model("Activity", activitySchema);