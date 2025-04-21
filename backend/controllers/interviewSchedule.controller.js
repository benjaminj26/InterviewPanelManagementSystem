const InterviewSchedule = require('../models/InterviewSchedule');
const Candidate = require('../models/candidate');
const Panel = require('../models/InterviewPanel');

// Create a new interview schedule
exports.createSchedule = async (req, res) => {
  try {
    const { candidate, panel, scheduledDate, startTime, endTime } = req.body;

    // 🔍 Basic field validation
    if (!candidate || !panel || !scheduledDate || !startTime || !endTime) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // 🔍 Check if Candidate and Panel exist
    const candidateExists = await Candidate.findById(candidate);
    const panelExists = await Panel.findById(panel);
    if (!candidateExists || !panelExists) {
      return res.status(404).json({ error: 'Candidate or Panel not found.' });
    }

    // 🔍 Prevent scheduling for candidates that are already not available (e.g., already interviewed)
    if (candidateExists.status !== 'Scheduled') {
      return res.status(400).json({ error: 'Candidate is not available for scheduling.' });
    }

    // 🔍 Prevent scheduling interviews for past dates
    if (new Date(scheduledDate) < new Date()) {
      return res.status(400).json({ error: 'Scheduled date must be in the future.' });
    }

    // 🔍 Ensure end time is after start time
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    if (end <= start) {
      return res.status(400).json({ error: 'End time must be after the start time.' });
    }

    // 🔍 Prevent overlapping interviews for the same candidate at the same time
    const conflict = await InterviewSchedule.findOne({
      candidate,
      scheduledDate,
      startTime
    });
    if (conflict) {
      return res.status(400).json({ error: 'Candidate already has an interview scheduled at this time.' });
    }

    // 🔍 Prevent overlapping interviews for the same panel at the same time
    const panelConflict = await InterviewSchedule.findOne({
      panel,
      scheduledDate,
      startTime
    });
    if (panelConflict) {
      return res.status(400).json({ error: 'Panel already has an interview scheduled at this time.' });
    }

    // ✅ Save schedule
    const schedule = new InterviewSchedule(req.body);
    const savedSchedule = await schedule.save();
    res.status(201).json(savedSchedule);

  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// Get all interview schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await InterviewSchedule.find()
      .populate('candidate') // Populate the Candidate field with the full document
      .populate('panel'); // Populate the InterviewPanel field with the full document
    res.json(schedules);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a schedule by ID
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await InterviewSchedule.findById(req.params.id)
      .populate('candidate') // Populate the Candidate field
      .populate('panel'); // Populate the InterviewPanel field
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an interview schedule
exports.updateSchedule = async (req, res) => {
  try {
    const updatedSchedule = await InterviewSchedule.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Return the updated document
    );
    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(updatedSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an interview schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const deletedSchedule = await InterviewSchedule.findByIdAndDelete(req.params.id);
    if (!deletedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json({ message: 'Schedule deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
