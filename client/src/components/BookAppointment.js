import React, { useState, useEffect } from 'react';

const BookAppointment = ({ doctors, onAppointmentBooked }) => {
  const [formData, setFormData] = useState({
    specialization: '',
    patientName: ''
  });
  const [message, setMessage] = useState('');
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    // Get unique specializations from doctors
    const specs = [...new Set(doctors.map(doc => doc.specialization))];
    setSpecializations(specs);
  }, [doctors]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage(`Appointment booked with ${data.doctor} successfully!`);
        setFormData({ specialization: '', patientName: '' });
        onAppointmentBooked();
      } else {
        setMessage(data.message || 'Error booking appointment');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        >
          <option value="">Select Specialization</option>
          {specializations.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Book Appointment
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default BookAppointment;
