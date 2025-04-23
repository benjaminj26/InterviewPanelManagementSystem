const Candidate = require('../models/candidate');
const Job = require('../models/Job');

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
  const candidates = await Candidate.find().populate('jobPost');
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

exports.getJobs = async (req, res) => {
	const jobs = await Job.find();
	if (jobs) {
		res.status(200).json(jobs);
	} else {
		res.status(400).json({ message: "No Content" });
	}
}