import React, { useState } from 'react';

const AddDoctor = ({ onDoctorAdded }) => {
  const [formData, setFormData] = useState({
    doctorId: '',
    name: '',
    specialization: '',
    maxDailyPatients: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/doctors/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Doctor added successfully!');
        setFormData({ doctorId: '', name: '', specialization: '', maxDailyPatients: '' });
        onDoctorAdded();
      } else {
        setMessage(data.message || 'Error adding doctor');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
      <h2>Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="doctorId"
          placeholder="Doctor ID"
          value={formData.doctorId}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <input
          type="number"
          name="maxDailyPatients"
          placeholder="Max Daily Patients"
          value={formData.maxDailyPatients}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Add Doctor
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default AddDoctor;
