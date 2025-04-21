// routes/interviewer.routes.js
const express = require('express');
const router = express.Router();
const interviewerController = require('../controllers/interviewer.controller');

// Define the routes for CRUD operations on Interviewers
router.post('/', interviewerController.createInterviewer);  // Create a new interviewer
router.get('/', interviewerController.getAllInterviewers);  // Get all interviewers
router.get('/:id', interviewerController.getInterviewerById);  // Get a single interviewer by ID
router.put('/:id', interviewerController.updateInterviewer);  // Update an interviewer by ID
router.delete('/:id', interviewerController.deleteInterviewer);  // Delete an interviewer by ID

module.exports = router;
