const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Add a new doctor
router.post('/add', doctorController.addDoctor);

// Get all doctors
router.get('/all', doctorController.getAllDoctors);

module.exports = router;
