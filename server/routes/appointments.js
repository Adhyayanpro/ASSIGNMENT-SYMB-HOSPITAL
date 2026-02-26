const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Book an appointment
router.post('/book', appointmentController.bookAppointment);

// Get all appointments
router.get('/all', appointmentController.getAllAppointments);

module.exports = router;
