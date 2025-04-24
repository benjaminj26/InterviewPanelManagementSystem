const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');

router.post("/", jobController.createJob);
router.get("/", jobController.getJobById);
router.put("/", jobController.updateJobById);
router.delete("/", jobController.deleteOneById);
router.get("/all", jobController.getAllJobs);

module.exports = router;