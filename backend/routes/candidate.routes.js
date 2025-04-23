const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidate.controller');

router.post('/', candidateController.createCandidate);
router.get('/', candidateController.getAllCandidates);
router.get("/jobs", candidateController.getJobs);
router.get('/:id', candidateController.getCandidateById);
router.put('/:id', candidateController.updateCandidate);
router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;
