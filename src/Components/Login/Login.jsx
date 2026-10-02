import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Already logged in? Go straight to the home page.
  useEffect(() => {
    if (sessionStorage.getItem('auth-token')) navigate('/');
  }, [navigate]);

  // Calls the login API to authenticate the user
  const login = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();

      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', email);
        if (json.name) sessionStorage.setItem('name', json.name);
        if (json.phone) sessionStorage.setItem('phone', json.phone);
        navigate('/');
        window.location.reload();
      } else {
        setError(json.error || 'Invalid email or password.');
      }
    } catch {
      setError('Cannot reach the server. Make sure the backend is running.');
    }
  };

  return (
    <div className="form-card login-card">
      <h1>Login</h1>
      <p className="form-hint">
        Are you a new member? <Link to="/signup">Sign Up Here</Link>
      </p>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={login}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" className="form-control" placeholder="Enter your email"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" className="form-control" placeholder="Enter your password"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn">Login</button>
          <button type="reset" className="btn btn-danger"
            onClick={() => { setEmail(''); setPassword(''); setError(''); }}>Reset</button>
        </div>
        <p className="forgot">Forgot Password?</p>
      </form>
    </div>
  );
};

export default Login;
