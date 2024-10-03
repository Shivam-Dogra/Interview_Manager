const mongoose = require('mongoose');

const interviewerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    expertise: { type: [String], required: true }
});

module.exports = mongoose.model('Interviewer', interviewerSchema);
