const mongoose = require('mongoose');

const interviewScheduleSchema = new mongoose.Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
    panel: { type: mongoose.Schema.Types.ObjectId, ref: 'InterviewPanel' },
    scheduledDate: Date,
    startTime: String,
    endTime: String
  });
  
  module.exports = mongoose.model('InterviewSchedule', interviewScheduleSchema);
  