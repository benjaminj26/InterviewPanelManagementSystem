const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./auth/google'); // Google OAuth config

const candidateRoutes = require('./routes/candidate.routes');
const panelRoutes = require('./routes/panel.routes');
const interviewerRoutes = require('./routes/interviewer.routes');
const interviewScheduleRoutes = require('./routes/interviewSchedule.routes');
const feedbackRoutes = require('./routes/interviewFeedback.routes');
const jobRoutes = require('./routes/job.routes');
const authRoutes = require('./routes/auth.routes');
const meetingRoutes = require('./routes/meeting.routes');
require('dotenv').config(); 

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'a random string',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Route setup
app.use('/api/candidates', candidateRoutes);
app.use('/api/panels', panelRoutes);
app.use('/api/interviewers', interviewerRoutes);
app.use('/api/schedules', interviewScheduleRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/auth', authRoutes);
app.use('/meeting', meetingRoutes);

// Default root
app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/crudApp')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
