const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  workplace: String,
  headline: String,
  avatar: String,
  education: [String],
  pinnedActivities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
  resetToken: String,
  resetTokenExpiry: Date,
})

module.exports = mongoose.model("User", userSchema)