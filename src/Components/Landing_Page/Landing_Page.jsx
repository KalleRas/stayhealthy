import React from 'react';
import { Link } from 'react-router-dom';
import './Landing_Page.css';

const services = [
  { title: 'Instant Consultation', text: 'Talk to a qualified doctor online within minutes.', to: '/instant-consultation' },
  { title: 'Book an Appointment', text: 'Find doctors by specialty and pick a time that suits you.', to: '/booking-consultation' },
  { title: 'Reviews', text: 'Share feedback on your consultations to help others.', to: '/reviews' },
  { title: 'Your Reports', text: 'View and download your medical reports securely.', to: '/reports' },
];

const Landing_Page = () => {
  return (
    <section className="hero-section">
      <div className="hero">
        <div className="hero__text">
          <h1>
            Your Health
            <br />
            <span className="text-gradient">Our Responsibility</span>
          </h1>
          <p>
            StayHealthy connects you with trusted doctors anytime, anywhere. Book appointments
            online and get instant consultations, even in remote and underserved areas.
          </p>
          <div className="hero__actions">
            <Link to="/signup"><button className="btn">Get Started</button></Link>
            <Link to="/booking-consultation"><button className="btn btn-outline">Find a Doctor</button></Link>
          </div>
        </div>
        <div className="hero__art" aria-hidden="true">
          <div className="pulse">
            <svg viewBox="0 0 64 64"><path d="M27 14h10v13h13v10H37v13H27V37H14V27h13z" fill="#fff" /></svg>
          </div>
        </div>
      </div>

      <div className="services">
        {services.map((s) => (
          <Link to={s.to} className="service-card" key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Landing_Page;
