const mongoose = require("mongoose")

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  type: {
    type: String,
    required: true,
    enum: [
      'consultancy',
      'examination',
      'event',
      'peer_review',
      'talk',
      'award',
      'funding',
      'impact',
      'membership',
      'external_engagement',
      'business_community',
      'public_engagement'
    ]
  },

  title: String,
  description: String,

  details: {
    type: mongoose.Schema.Types.Mixed
  },

  pinned: { type: Boolean, default: false },
  startDate: Date,
  endDate: Date,

  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },

}, {
  timestamps: true
})

module.exports = mongoose.model("Activity", activitySchema);