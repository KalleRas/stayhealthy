import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Sign_Up.css';

const Sign_Up = () => {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!role) e.role = 'Please select a role.';
    if (!name.trim()) e.name = 'Name is required.';
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) e.email = 'Enter a valid email address.';
    if (!/^[0-9]{10}$/.test(phone)) e.phone = 'Phone number must be exactly 10 digits.';
    if (password.length < 8) e.password = 'Password must be at least 8 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Calls the registration API to create a new user
  const register = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, name, email, phone, password }),
      });
      const json = await response.json();

      if (json.authtoken) {
        // Save the user's session so the rest of the app knows they are logged in
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('email', email);
        navigate('/');
        window.location.reload();
      } else {
        setServerError(json.error || 'Registration failed. Please try again.');
      }
    } catch {
      setServerError('Cannot reach the server. Make sure the backend is running.');
    }
  };

  const handleReset = () => {
    setRole(''); setName(''); setEmail(''); setPhone(''); setPassword('');
    setErrors({}); setServerError('');
  };

  return (
    <div className="form-card signup-card">
      <h1>Sign Up</h1>
      <p className="form-hint">
        Already a member? <Link to="/login">Login</Link>
      </p>

      {serverError && <div className="alert alert-error">{serverError}</div>}

      <form method="POST" action="/api/auth/register" onSubmit={register} onReset={handleReset} noValidate>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role" className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select your role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          {errors.role && <div className="form-error">{errors.role}</div>}
          {role && (
            <p className="role-text">{role === 'doctor' ? 'Signup as a Doctor' : 'Signup as a Patient'}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" className="form-control" placeholder="Enter your name"
            value={name} onChange={(e) => setName(e.target.value)} required />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" className="form-control" placeholder="Enter your email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input id="phone" type="tel" className="form-control" placeholder="Enter your 10-digit phone number"
            maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} required />
          {errors.phone && <div className="form-error">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" className="form-control" placeholder="Enter your password"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          {errors.password && <div className="form-error">{errors.password}</div>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn">Submit</button>
          <button type="reset" className="btn btn-danger">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Sign_Up;
