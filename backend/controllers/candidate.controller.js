const Candidate = require('../models/candidate');

exports.createCandidate = async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    const saved = await candidate.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllCandidates = async (req, res) => {
  const candidates = await Candidate.find();
  res.json(candidates);
};

exports.getCandidateById = async (req, res) => {
  const candidate = await Candidate.findById(req.params.id);
  res.json(candidate);
};

exports.updateCandidate = async (req, res) => {
  const updated = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteCandidate = async (req, res) => {
  await Candidate.findByIdAndDelete(req.params.id);
  res.json({ message: 'Candidate deleted' });
};
