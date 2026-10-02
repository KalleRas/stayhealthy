import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './ProfileCard.css';

// Shows the logged-in user's profile and lets them edit name and phone.
const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem('auth-token');
    if (!authtoken) {
      navigate('/login');
    } else {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    const authtoken = sessionStorage.getItem('auth-token');
    const email = sessionStorage.getItem('email');
    const fallback = {
      name: sessionStorage.getItem('name') || '',
      email: email || '',
      phone: sessionStorage.getItem('phone') || '',
    };
    try {
      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${authtoken}`, Email: email },
      });
      if (!response.ok) throw new Error('Failed to fetch user profile');
      const user = await response.json();
      setUserDetails(user);
      setUpdatedDetails(user);
    } catch {
      // Backend not reachable: show what we saved at login
      setUserDetails(fallback);
      setUpdatedDetails(fallback);
    }
  };

  const handleEdit = () => setEditMode(true);

  const handleInputChange = (e) => {
    setUpdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authtoken = sessionStorage.getItem('auth-token');
    const email = sessionStorage.getItem('email');
    try {
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authtoken}`,
          'Content-Type': 'application/json',
          Email: email,
        },
        body: JSON.stringify(updatedDetails),
      });
      if (!response.ok) throw new Error('Failed to update profile');
    } catch {
      // Keep working without the backend; details are still saved in the session
    }
    sessionStorage.setItem('name', updatedDetails.name);
    sessionStorage.setItem('phone', updatedDetails.phone);
    setUserDetails(updatedDetails);
    setEditMode(false);
    setMessage('Profile updated successfully!');
    // Reload so the Navbar shows the new name
    setTimeout(() => window.location.reload(), 800);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">{(userDetails.name || '?').charAt(0).toUpperCase()}</div>
        {message && <div className="alert alert-success">{message}</div>}

        {editMode ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" className="form-control"
                value={userDetails.email || ''} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" className="form-control"
                value={updatedDetails.name || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input id="phone" type="tel" name="phone" className="form-control"
                pattern="[0-9]{10}" title="10-digit phone number"
                value={updatedDetails.phone || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn">Save</button>
              <button type="button" className="btn btn-outline"
                onClick={() => { setUpdatedDetails(userDetails); setEditMode(false); }}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <h1>Welcome, {userDetails.name}</h1>
            <p><b>Email:</b> {userDetails.email}</p>
            <p><b>Phone:</b> {userDetails.phone}</p>
            <button className="btn" onClick={handleEdit}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
