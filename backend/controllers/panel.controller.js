const Panel = require('../models/InterviewPanel');

exports.createPanel = async (req, res) => {
  try {
    const panel = new Panel(req.body);
    const saved = await panel.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPanels = async (req, res) => {
  const panels = await Panel.find().populate('interviewers');
  res.json(panels);
};

exports.getPanelById = async (req, res) => {
  const panel = await Panel.findById(req.params.id).populate('interviewers');
  res.json(panel);
};

exports.updatePanel = async (req, res) => {
  const updated = await Panel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deletePanel = async (req, res) => {
  await Panel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Panel deleted' });
};
