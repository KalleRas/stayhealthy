import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { specialities } from '../../data/doctors';
import './FindDoctorSearch.css';

// Search bar that lets the user find doctors by specialty.
// Picking a specialty puts it in the URL (?speciality=...) so the
// booking page can read it with useSearchParams.
const FindDoctorSearch = ({ basePath = '/booking-consultation' }) => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const navigate = useNavigate();

  const filtered = specialities.filter((s) =>
    s.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    navigate(`${basePath}?speciality=${encodeURIComponent(speciality)}`);
  };

  return (
    <div className="finddoctor">
      <h2>Find a doctor and Consult instantly</h2>
      <div className="search-wrap">
        <input
          type="text"
          className="search-doctor-input"
          placeholder="Search doctors, clinics, hospitals, etc."
          value={searchDoctor}
          onFocus={() => setDoctorResultHidden(false)}
          onBlur={() => setTimeout(() => setDoctorResultHidden(true), 150)}
          onChange={(e) => setSearchDoctor(e.target.value)}
        />
        {!doctorResultHidden && (
          <ul className="search-doctor-results">
            {filtered.length === 0 && <li className="no-result">No specialty found</li>}
            {filtered.map((speciality) => (
              <li key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}>
                <span>🔍 {speciality}</span>
                <span className="tag">SPECIALITY</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FindDoctorSearch;
