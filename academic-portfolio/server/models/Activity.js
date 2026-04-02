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
  status: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Activity", activitySchema);