const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        const saved = await job.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getJobById = async (req, res) => {
    try {
        const jobId = req.query.jobId;

        const job = Job.findOne({ jobId });
        res.status(200).json(job);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();

        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateJobById = async (req, res) => {
    try {
        const jobId = req.query.jobId;
        
        const job = await Job.findOne(
            { jobId },
            req.body,
            { new: true }
        );

        res.status(200).json(job);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteOneById = async (req, res) => {
    try {
        const jobId = req.query.jobId;
        const job = await Job.findOneAndDelete({ jobId });

        if (job === null) {
            res.status(200).json({ message: "Job does not exist" });
        } else {
            res.status(200).json(job);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}