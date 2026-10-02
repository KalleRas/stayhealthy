import React, { useEffect, useState } from 'react';
import './Notification.css';

// Wraps the whole app (see App.jsx) and shows the user's latest
// appointment as a notification card on every page.
const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  const loadData = () => {
    setIsLoggedIn(Boolean(sessionStorage.getItem('auth-token')));
    const storedDoctor = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointments = JSON.parse(localStorage.getItem('appointmentData'));
    setDoctorData(storedDoctor);
    setAppointmentData(storedAppointments && storedAppointments.length ? storedAppointments : null);
  };

  useEffect(() => {
    loadData();
    // Update when an appointment is booked or cancelled
    window.addEventListener('appointment-change', loadData);
    return () => window.removeEventListener('appointment-change', loadData);
  }, []);

  return (
    <div>
      {children}
      {isLoggedIn && appointmentData && (
        <>
          <div className="appointment-card">
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message">
                <strong>Doctor:</strong> {doctorData?.name}
              </p>
              <p className="appointment-card__message">
                <strong>Speciality:</strong> {doctorData?.speciality}
              </p>
              {appointmentData.map((appointment) => (
                <div key={appointment.id}>
                  <p className="appointment-card__message">
                    <strong>Name:</strong> {appointment.name}
                  </p>
                  <p className="appointment-card__message">
                    <strong>Phone Number:</strong> {appointment.phoneNumber}
                  </p>
                  {appointment.date && (
                    <p className="appointment-card__message">
                      <strong>Date of Appointment:</strong> {appointment.date}
                    </p>
                  )}
                  {appointment.time && (
                    <p className="appointment-card__message">
                      <strong>Time Slot:</strong> {appointment.time}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;
