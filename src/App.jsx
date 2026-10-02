import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import Notification from './Components/Notification/Notification';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ProfileCard from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

function App() {
  return (
    <div className="App">
      {/* Notification wraps the whole app, so the appointment
          reminder is shown on every page (application-wide). */}
      <Notification>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking-consultation" element={<BookingConsultation />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/reviews" element={<ReviewForm />} />
            <Route path="/profile" element={<ProfileCard />} />
            <Route path="/reports" element={<ReportsLayout />} />
          </Routes>
        </main>
      </Notification>
    </div>
  );
}

export default App;
