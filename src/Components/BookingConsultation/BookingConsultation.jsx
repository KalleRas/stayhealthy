import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import DoctorCard from '../DoctorCard/DoctorCard';
import { doctors } from '../../data/doctors';
import './BookingConsultation.css';

// Appointment booking page: search by specialty, then book a doctor.
const BookingConsultation = () => {
  const [searchParams] = useSearchParams();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredDoctors([]);
      setIsSearched(false);
    } else {
      const filtered = doctors.filter((doctor) =>
        doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  };

  // Re-run the search whenever the specialty in the URL changes
  useEffect(() => {
    handleSearch(searchParams.get('speciality'));
  }, [searchParams]);

  return (
    <div className="page">
      <FindDoctorSearch basePath="/booking-consultation" />
      {isSearched ? (
        <>
          <h2 className="results-title">
            {filteredDoctors.length} doctors are available {searchParams.get('speciality')}
          </h2>
          <p className="page-subtitle">Book appointments with minimum wait-time & verified doctor details</p>
          <div className="doctor-grid">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => <DoctorCard key={doctor.id} {...doctor} />)
            ) : (
              <p>No doctors found.</p>
            )}
          </div>
        </>
      ) : (
        <p className="page-subtitle center">Choose a specialty above to see available doctors.</p>
      )}
    </div>
  );
};

export default BookingConsultation;
