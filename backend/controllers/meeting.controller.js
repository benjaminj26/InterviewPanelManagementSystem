const InterviewSchedule = require('../models/InterviewSchedule');
const { v4: uuidv4 } = require('uuid');

exports.getMeetingLink = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/meeting/google');
    }

    const { google } = require('googleapis');
    const calendar = google.calendar({ version: 'v3' });

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: req.user.accessToken });

    const { candidateEmail, startTime, endTime } = req.body;  // 👈 Receive from frontend
    const uniqueRequestId = uuidv4();  // 🔥 Unique meeting id

    const event = {
        summary: 'Interview with Candidate',
        description: 'Technical interview',
        start: {
            dateTime: startTime, // Example: '2025-04-30T10:00:00-07:00'
            timeZone: 'America/Los_Angeles',
        },
        end: {
            dateTime: endTime, // Example: '2025-04-30T11:00:00-07:00'
            timeZone: 'America/Los_Angeles',
        },
        conferenceData: {
            createRequest: {
                requestId: uniqueRequestId,
                conferenceSolutionKey: {
                    type: 'hangoutsMeet',
                },
            },
        },
        attendees: [
            { email: candidateEmail }  // 🔥 Send to this candidate
        ]
    };

    try {
        const response = await calendar.events.insert({
            auth,
            calendarId: 'primary',
            resource: event,
            conferenceDataVersion: 1
        });

        res.send({
            message: 'Interview scheduled!',
            calendarLink: response.data.htmlLink,
            meetLink: response.data.conferenceData.entryPoints[0].uri
        });
    } catch (err) {
        console.error('Calendar API error:', err);
        res.status(500).send('Failed to create event');
    }
};