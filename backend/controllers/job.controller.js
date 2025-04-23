const { findOne } = require('../models/candidate');
const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        const saved = await job.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

exports.getJobById = async (req, res) => {
    try {
        // const job = new Job(req.body);
        // const saved = await job.save();

        const jobId = req.query.jobId;

        const job = findOne({ jobId });
        res.status(200).json(job);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}