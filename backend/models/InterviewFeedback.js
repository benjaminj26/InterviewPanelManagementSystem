const mongoose = require('mongoose');

const interviewFeedbackSchema = new mongoose.Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
    interviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'Interviewer' },
    panel: { type: mongoose.Schema.Types.ObjectId, ref: 'InterviewPanel' },
    feedbackDate: { type: Date, default: Date.now },
    rating: Number,
    comments: String,
    recommendation: { type: String, enum: ['Hire', 'Hold', 'Reject'] }
  });
  
  module.exports = mongoose.model('InterviewFeedback', interviewFeedbackSchema);
  