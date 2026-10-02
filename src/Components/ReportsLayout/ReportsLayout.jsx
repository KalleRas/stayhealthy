import React from 'react';
import { consultations } from '../../data/doctors';
import '../ReviewForm/ReviewForm.css';

const reportUrl = `${import.meta.env.BASE_URL}patient_report.pdf`;

// Lists the user's reports with options to view or download them.
const ReportsLayout = () => (
  <div className="page">
    <h1 className="page-title">Your Reports</h1>
    <p className="page-subtitle">View or download the reports from your consultations.</p>
    <div className="table-wrap">
      <table className="review-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td>{c.doctorName}</td>
              <td>{c.speciality}</td>
              <td>
                <a target="_blank" href={reportUrl} className="btn" rel="noreferrer">View Report</a>
              </td>
              <td>
                <a href={reportUrl} download="patient_report.pdf" className="btn btn-outline">Download Report</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ReportsLayout;
