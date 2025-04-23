const mongoose = require('mongoose');
// const Job = require('./Job');

const interviewPanelSchema = new mongoose.Schema({
    panelName: String,
    createdDate: { type: Date, default: Date.now },
    interviewType: { type: String, enum: ['Technical', 'HR', 'Managerial'] },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    interviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interviewer' }],
    scheduledDateTime: Date
  });
  
  module.exports = mongoose.model('InterviewPanel', interviewPanelSchema);
  