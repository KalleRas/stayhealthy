import React, { useState } from 'react';

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

// Appointment booking form with Name, Phone Number, Date and Time.
const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState(sessionStorage.getItem('name') || '');
  const [phoneNumber, setPhoneNumber] = useState(sessionStorage.getItem('phone') || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, date, time, doctorName, doctorSpeciality });
    setName(''); setPhoneNumber(''); setDate(''); setTime('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" className="form-control" value={name}
          onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input id="phoneNumber" type="tel" className="form-control" value={phoneNumber}
          pattern="[0-9]{10}" title="10-digit phone number"
          onChange={(e) => setPhoneNumber(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date of Appointment</label>
        <input id="date" type="date" className="form-control" min={today} value={date}
          onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="time">Book Time Slot</label>
        <select id="time" className="form-control" value={time}
          onChange={(e) => setTime(e.target.value)} required>
          <option value="">Select a time slot</option>
          {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
        </select>
      </div>
      <button type="submit" className="btn" style={{ width: '100%' }}>Book Now</button>
    </form>
  );
};

export default AppointmentForm;
