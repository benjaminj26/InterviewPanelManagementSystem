const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meeting.controller');
const passport = require('passport');

// Calendar event route (protected)
// Make sure uuid is installed

// Endpoint is localhost:3000/meeting/google/calendar
router.post('/google/calendar', meetingController.getMeetingLink);
router.get('/google/login-success', async (req, res) => {
    res.status(200).json({ message: "Authentication Successful" });
});

router.get('/google/login-failure', async (req, res) => {
    res.status(500).json({ message: "Authentication Failed" });
});

// Google OAuth callback and calendar integration
router.get('/google', passport.authenticate('google'));

router.get('/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/meeting/google/login-failure',
      successRedirect: '/meeting/google/login-success'
    })
);

module.exports = router;