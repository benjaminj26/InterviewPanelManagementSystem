const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors');
const candidateRoutes = require('./routes/candidate.routes');
const panelRoutes = require('./routes/panel.routes');
const interviewerRoutes = require('./routes/interviewer.routes');
const interviewScheduleRoutes = require('./routes/interviewSchedule.routes');
const feedbackRoutes = require('./routes/interviewFeedback.routes');
const jobRoutes = require('./routes/job.routes');

const app=express()

app.use(cors());
app.use(express.json());


app.use('/api/candidates', candidateRoutes);
app.use('/api/panels', panelRoutes);
app.use('/api/interviewers', interviewerRoutes);
app.use('/api/schedules', interviewScheduleRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/jobs', jobRoutes);


app.get('/', (req, res) => {
    res.send('Server is running ✅');
  });

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/crudApp').then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });