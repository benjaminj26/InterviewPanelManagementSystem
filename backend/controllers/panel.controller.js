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
  res.status(200).json(panels);
};

exports.getPanelById = async (req, res) => {
  try {
    const panel = await Panel.findById(req.params.id).populate('interviewers');
  
    if (panel === null) {
      res.status(404).json({ message: "Panel not found!" });
    } else {
      res.status(200).json(panel);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updatePanel = async (req, res) => {
  try {
    const updated = await Panel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: err.message });
  }
};

exports.deletePanel = async (req, res) => {
  try{
    await Panel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Panel deleted' });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: err.message });
  }
};
