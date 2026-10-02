import React, { useState } from 'react';
import './GiveReviews.css';

// Review form for one consultation. After submitting, the button is
// disabled so the user can give only one review per consultation.
function GiveReviews({ doctorName, onSubmitted }) {
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({ name: '', review: '', rating: 0 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating > 0) {
      setSubmittedMessage(formData);
      setShowWarning(false);
      setShowForm(false);
      if (onSubmitted) onSubmitted(formData);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="give-reviews">
      <button
        className="btn"
        onClick={() => setShowForm(true)}
        disabled={submittedMessage !== null}
      >
        {submittedMessage ? 'Feedback Given' : 'Click Here'}
      </button>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <form className="modal review-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setShowForm(false)} aria-label="Close">✕</button>
            <h3>Give Your Feedback</h3>
            <p className="modal-sub">{doctorName}</p>
            {showWarning && <div className="alert alert-error">Please fill out all fields.</div>}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" className="form-control"
                value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="review">Review</label>
              <textarea id="review" name="review" rows="4" className="form-control"
                value={formData.review} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button type="button" key={n}
                    className={`star ${n <= formData.rating ? 'filled' : ''}`}
                    onClick={() => setFormData({ ...formData, rating: n })}
                    aria-label={`${n} star`}>★</button>
                ))}
              </div>
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }}>Submit</button>
          </form>
        </div>
      )}

      {submittedMessage && (
        <div className="submitted-review">
          <p>"{submittedMessage.review}"</p>
          <p className="rating">{'★'.repeat(submittedMessage.rating)}{'☆'.repeat(5 - submittedMessage.rating)}</p>
        </div>
      )}
    </div>
  );
}

export default GiveReviews;
