import React, { useState } from 'react';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import './DoctorCard.css';

// Card showing a doctor's details, with booking and cancel logic.
// instant = true uses the instant-consultation form (name + phone only).
const DoctorCard = ({ name, speciality, experience, ratings, instant = false }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const notifyChange = () => window.dispatchEvent(new Event('appointment-change'));

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = { id: Date.now(), ...appointmentData };
    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    setShowModal(false);

    // Save so the Notification component can show it on every page
    localStorage.setItem('doctorData', JSON.stringify({ name, speciality }));
    localStorage.setItem('appointmentData', JSON.stringify(updated));
    notifyChange();
  };

  // Cancel an appointment: remove it from state and from storage
  const handleCancel = (appointmentId) => {
    const updated = appointments.filter((a) => a.id !== appointmentId);
    setAppointments(updated);
    if (updated.length === 0) {
      localStorage.removeItem('doctorData');
      localStorage.removeItem('appointmentData');
    } else {
      localStorage.setItem('appointmentData', JSON.stringify(updated));
    }
    notifyChange();
  };

  const initials = name.replace('Dr. ', '').split(' ').map((p) => p[0]).join('');

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image">{initials}</div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">
            Ratings: {'★'.repeat(ratings)}{'☆'.repeat(5 - ratings)}
          </div>
        </div>
      </div>

      {appointments.length > 0 ? (
        <div className="booked">
          <h4>Appointment Booked!</h4>
          {appointments.map((appointment) => (
            <div className="bookedInfo" key={appointment.id}>
              <p>Name: {appointment.name}</p>
              <p>Phone Number: {appointment.phoneNumber}</p>
              {appointment.date && <p>Date: {appointment.date}</p>}
              {appointment.time && <p>Time Slot: {appointment.time}</p>}
              <button className="btn btn-danger" onClick={() => handleCancel(appointment.id)}>
                Cancel Appointment
              </button>
            </div>
          ))}
        </div>
      ) : (
        <button className="btn book-appointment-btn" onClick={() => setShowModal(true)}>
          Book Appointment
          <span className="no-fee">No Booking Fee</span>
        </button>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">✕</button>
            <h3>Book an appointment with {name}</h3>
            <p className="modal-sub">{speciality} · {experience} years experience</p>
            {instant ? (
              <AppointmentFormIC doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
            ) : (
              <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
