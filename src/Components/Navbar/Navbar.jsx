import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Read the login state saved by Sign_Up / Login
  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    const name = sessionStorage.getItem('name') || sessionStorage.getItem('email') || '';
    setIsLoggedIn(Boolean(token));
    setUsername(name.split('@')[0]);
  }, []);

  // Logout: clear all session and appointment data, then go to the home page
  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('phone');
    localStorage.removeItem('doctorData');
    localStorage.removeItem('appointmentData');
    window.dispatchEvent(new Event('appointment-change'));
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
    window.location.reload();
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav__logo" onClick={closeMenu}>
        StayHealthy
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="26" height="26" aria-hidden="true">
          <rect width="64" height="64" rx="14" fill="#0b6e4f" />
          <path d="M27 14h10v13h13v10H37v13H27V37H14V27h13z" fill="#fff" />
        </svg>
      </Link>

      <button
        className="nav__toggle"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <ul className={`nav__links ${menuOpen ? 'active' : ''}`}>
        <li className="link"><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li className="link"><Link to="/booking-consultation" onClick={closeMenu}>Appointments</Link></li>
        <li className="link"><Link to="/instant-consultation" onClick={closeMenu}>Instant Consultation</Link></li>
        <li className="link"><Link to="/reviews" onClick={closeMenu}>Reviews</Link></li>

        {isLoggedIn ? (
          <>
            <li className="link nav__user">
              <button className="nav__user-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                Welcome, {username} ▾
              </button>
              {dropdownOpen && (
                <ul className="nav__dropdown">
                  <li><Link to="/profile" onClick={closeMenu}>Your Profile</Link></li>
                  <li><Link to="/reports" onClick={closeMenu}>Your Reports</Link></li>
                </ul>
              )}
            </li>
            <li className="link">
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup" onClick={closeMenu}><button className="btn">Sign Up</button></Link>
            </li>
            <li className="link">
              <Link to="/login" onClick={closeMenu}><button className="btn btn-outline">Login</button></Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
