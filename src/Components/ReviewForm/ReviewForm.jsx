import React, { useState } from 'react';
import GiveReviews from '../GiveReviews/GiveReviews';
import { consultations } from '../../data/doctors';
import './ReviewForm.css';

// Reviews page: lists past consultations (stored in state as an array
// of objects and rendered with map) with a review button for each one.
const ReviewForm = () => {
  const [doctorList] = useState(consultations);

  return (
    <div className="page">
      <h1 className="page-title">Reviews</h1>
      <p className="page-subtitle">Tell us about your consultations. You can give one review per consultation.</p>
      <div className="table-wrap">
        <table className="review-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>Provide feedback</th>
            </tr>
          </thead>
          <tbody>
            {doctorList.map((doctor, index) => (
              <tr key={doctor.id}>
                <td>{index + 1}</td>
                <td>{doctor.doctorName}</td>
                <td>{doctor.speciality}</td>
                <td><GiveReviews doctorName={doctor.doctorName} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewForm;
