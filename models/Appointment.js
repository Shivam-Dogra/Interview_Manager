const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    interviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'Interviewer', required: true },
    skillset: { type: [String], required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
