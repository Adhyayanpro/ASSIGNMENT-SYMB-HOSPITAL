const Doctor = require('../models/Doctor');

// Add a new doctor
exports.addDoctor = async (req, res) => {
  try {
    const { doctorId, name, specialization, maxDailyPatients } = req.body;

    // Validation
    if (!doctorId || !name || !specialization || !maxDailyPatients) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ doctorId });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor ID already exists' });
    }

    // Create new doctor
    const doctor = new Doctor({
      doctorId,
      name,
      specialization,
      maxDailyPatients,
      currentAppointments: 0
    });

    await doctor.save();
    res.status(201).json({ message: 'Doctor added successfully', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Error adding doctor', error: error.message });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
};
