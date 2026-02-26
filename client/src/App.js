import React, { useState, useEffect } from 'react';
import './App.css';
import AddDoctor from './components/AddDoctor';
import DoctorList from './components/DoctorList';
import BookAppointment from './components/BookAppointment';
import { apiFetch } from './api';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetchDoctors();
  }, [refresh]);

  const fetchDoctors = async () => {
    try {
      const response = await apiFetch('/api/doctors/all');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleDoctorAdded = () => {
    setRefresh(refresh + 1);
  };

  const handleAppointmentBooked = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Doctor Appointment Scheduler</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div>
          <AddDoctor onDoctorAdded={handleDoctorAdded} />
        </div>
        <div>
          <BookAppointment doctors={doctors} onAppointmentBooked={handleAppointmentBooked} />
        </div>
      </div>

      <div>
        <DoctorList refresh={refresh} />
      </div>
    </div>
  );
}

export default App;
