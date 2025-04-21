const express = require('express');
const router = express.Router();
const interviewScheduleController = require('../controllers/interviewSchedule.controller');

// Create a new interview schedule
router.post('/', interviewScheduleController.createSchedule);

// Get all interview schedules
router.get('/', interviewScheduleController.getAllSchedules);

// Get a schedule by ID
router.get('/:id', interviewScheduleController.getScheduleById);

// Update an interview schedule
router.put('/:id', interviewScheduleController.updateSchedule);

// Delete an interview schedule
router.delete('/:id', interviewScheduleController.deleteSchedule);

module.exports = router;
