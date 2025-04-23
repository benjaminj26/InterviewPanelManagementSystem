const mongoose = require('mongoose');

const interviewerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    department: String,
    designation: String,
    expertiseAreas: [String],
    availableOn: Date
});
  
module.exports = mongoose.model('Interviewer', interviewerSchema);