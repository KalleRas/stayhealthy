import React, { useState } from 'react';

// Instant consultation form: only Name and Phone Number are needed.
const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState(sessionStorage.getItem('name') || '');
  const [phoneNumber, setPhoneNumber] = useState(sessionStorage.getItem('phone') || '');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, doctorName, doctorSpeciality });
    setName('');
    setPhoneNumber('');
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
      <button type="submit" className="btn" style={{ width: '100%' }}>Book Now</button>
    </form>
  );
};

export default AppointmentFormIC;
