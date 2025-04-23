const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    jobId: String,
    position: String,
    description: String,
    requirements: [String]
});

module.exports = mongoose.model('Job', jobSchema)