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

  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },

}, {
  timestamps: true
})

module.exports = mongoose.model("Activity", activitySchema);