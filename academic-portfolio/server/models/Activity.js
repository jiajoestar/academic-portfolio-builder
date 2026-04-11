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
      'election',
      'peer_review',
      'talksOrPresentations',
      'prizes',
      'funding',
      'external',
      'membershipOfBoard',
      'membershipOfCommittee',
      'membershipOfCouncil',
      'membershipOfExternalResearchOrg',
      'membershipOfGovernment',
      'advisory_panel',
      'national_honour',
      'festival',
      'honoraryDegree',
      'lecture',
      'mediaArticle',
      'schools',
      'participation',
      'research',
      'hostingExternal',
      'cpd',
      'contribution',
      'fellowship',
      'appointment'
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