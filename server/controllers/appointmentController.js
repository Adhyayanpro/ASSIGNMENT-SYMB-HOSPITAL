const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const crypto = require('crypto');

// Book an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { specialization, patientName } = req.body;

    // Validation
    if (!specialization || !patientName) {
      return res.status(400).json({ message: 'Specialization and patient name are required' });
    }

    // Find doctors with the given specialization
    const availableDoctors = await Doctor.find({ specialization });

    if (availableDoctors.length === 0) {
      return res.status(404).json({ message: 'No doctors available for this specialization' });
    }

    // Find doctor with fewest appointments
    const doctor = availableDoctors.reduce((prev, current) => {
      return prev.currentAppointments < current.currentAppointments ? prev : current;
    });

    // Check if doctor is full
    if (doctor.currentAppointments >= doctor.maxDailyPatients) {
      return res.status(400).json({ message: 'All doctors for this specialization are fully booked' });
    }

    // Create appointment
    const appointmentId = crypto.randomBytes(8).toString('hex');
    const appointment = new Appointment({
      appointmentId,
      doctorId: doctor.doctorId,
      doctorName: doctor.name,
      specialization,
      patientName
    });

    // Save appointment
    await appointment.save();

    // Update doctor's current appointments
    doctor.currentAppointments += 1;
    await doctor.save();

    res.status(201).json({ 
      message: 'Appointment booked successfully', 
      appointment,
      doctor: doctor.name
    });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error: error.message });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};
