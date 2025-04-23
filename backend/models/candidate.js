const mongoose = require('mongoose');
const Job = require('./Job');

const candidateSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  jobPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  resumeLink: String,
  experienceYears: Number,
  status: { type: String, enum: ['Scheduled', 'Interviewed', 'Selected', 'Rejected'], default: 'Scheduled' },
  availableOn: Date
});

module.exports = mongoose.model('Candidate', candidateSchema);
