const mongoose = require('mongoose');

const interviewPanelSchema = new mongoose.Schema({
    panelName: String,
    createdDate: { type: Date, default: Date.now },
    interviewType: { type: String, enum: ['Technical', 'HR', 'Managerial'] },
    interviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interviewer' }],
    scheduledDateTime: Date
  });
  
  module.exports = mongoose.model('InterviewPanel', interviewPanelSchema);
  