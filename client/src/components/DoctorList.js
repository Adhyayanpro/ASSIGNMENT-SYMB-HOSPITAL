import React, { useEffect, useState } from 'react';

const DoctorList = ({ refresh }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, [refresh]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/doctors/all');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
    setLoading(false);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
      <h2>All Doctors</h2>
      {loading ? (
        <p>Loading...</p>
      ) : doctors.length === 0 ? (
        <p>No doctors available</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Doctor ID</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Specialization</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Max Daily Patients</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Current Appointments</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.doctorId}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{doctor.doctorId}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{doctor.name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{doctor.specialization}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{doctor.maxDailyPatients}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{doctor.currentAppointments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorList;
