const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('candidate').populate('interviewer');
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new appointment
router.post('/', async (req, res) => {
    const appointment = new Appointment({
        candidate: req.body.candidate,
        interviewer: req.body.interviewer,
        skillset: req.body.skillset,
        date: req.body.date
    });

    try {
        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an appointment
router.put('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        appointment.candidate = req.body.candidate || appointment.candidate;
        appointment.interviewer = req.body.interviewer || appointment.interviewer;
        appointment.skillset = req.body.skillset || appointment.skillset;
        appointment.date = req.body.date || appointment.date;

        const updatedAppointment = await appointment.save();
        res.json(updatedAppointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        await appointment.remove();
        res.json({ message: 'Appointment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
