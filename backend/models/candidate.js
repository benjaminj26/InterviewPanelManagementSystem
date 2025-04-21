const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  resumeLink: String,
  appliedPosition: String,
  experienceYears: Number,
  status: { type: String, enum: ['Scheduled', 'Interviewed', 'Selected', 'Rejected'], default: 'Scheduled' }
});

module.exports = mongoose.model('Candidate', candidateSchema);
