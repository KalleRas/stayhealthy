import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import DoctorCard from '../DoctorCard/DoctorCard';
import { doctors } from '../../data/doctors';

// Instant consultation page: uses the short form (name + phone).
const InstantConsultation = () => {
  const [searchParams] = useSearchParams();
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  useEffect(() => {
    const speciality = searchParams.get('speciality');
    setFilteredDoctors(
      speciality
        ? doctors.filter((d) => d.speciality.toLowerCase().includes(speciality.toLowerCase()))
        : doctors
    );
  }, [searchParams]);

  return (
    <div className="page">
      <FindDoctorSearch basePath="/instant-consultation" />
      <h2 className="results-title">{filteredDoctors.length} doctors available for instant consultation</h2>
      <p className="page-subtitle">Book with your name and phone number, no waiting.</p>
      <div className="doctor-grid">
        {filteredDoctors.map((doctor) => <DoctorCard key={doctor.id} {...doctor} instant />)}
      </div>
    </div>
  );
};

export default InstantConsultation;
