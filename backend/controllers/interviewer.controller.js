// controllers/interviewer.controller.js
const Interviewer = require('../models/Interviewer');

// Create a new interviewer
exports.createInterviewer = async (req, res) => {
  try {
    const interviewer = new Interviewer(req.body);
    const saved = await interviewer.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all interviewers
exports.getAllInterviewers = async (req, res) => {
  try {
    const interviewers = await Interviewer.find();
    res.json(interviewers);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching interviewers' });
  }
};

// Get a single interviewer by ID
exports.getInterviewerById = async (req, res) => {
  try {
    const interviewer = await Interviewer.findById(req.params.id);
    if (!interviewer) {
      return res.status(404).json({ error: 'Interviewer not found' });
    }
    res.json(interviewer);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching interviewer' });
  }
};

// Update an interviewer's details
exports.updateInterviewer = async (req, res) => {
  try {
    const updated = await Interviewer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Interviewer not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an interviewer
exports.deleteInterviewer = async (req, res) => {
  try {
    const deleted = await Interviewer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Interviewer not found' });
    }
    res.json({ message: 'Interviewer deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting interviewer' });
  }
};
