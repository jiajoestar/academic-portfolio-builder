const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { 
    type: String,
    required: true, 
    validate: {
      validator: function(value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(value)
      },
      message: 'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.'
    }
  },
  workplace: String,
  headline: String,
  avatar: String,
  education: [String],
  pinnedActivities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
  resetToken: String,
  resetTokenExpiry: Date,
})

module.exports = mongoose.model("User", userSchema)