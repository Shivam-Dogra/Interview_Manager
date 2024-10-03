const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const candidatesRoutes = require('./routes/candidates');
const interviewersRoutes = require('./routes/interviewers');
const appointmentsRoutes = require('./routes/appointments');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/interview_manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/candidates', candidatesRoutes);
app.use('/api/interviewers', interviewersRoutes);
app.use('/api/appointments', appointmentsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
