import React, { useState } from 'react';

const AboutUs = () => {
  const [feedback, setFeedback] = useState({ name: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback({ name: '', message: '' });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">About iNoteBook</h1>
      <div className="row">
        {/* Left Side: About Us and Description */}
        <div className="col-md-8">
          <h2>Our Mission</h2>
          <p>
            At iNoteBook, we strive to provide a seamless note-taking experience that empowers users to organize their thoughts and ideas efficiently. Our platform offers an intuitive interface that allows users to save, delete, update, and download notes with ease.
          </p>
          <h2>Why Choose Us?</h2>
          <ul>
            <li><strong>User-Friendly:</strong> Designed with simplicity in mind.</li>
            <li><strong>Secure:</strong> Your notes are safe with us.</li>
            <li><strong>Accessible:</strong> Available on multiple devices.</li>
            <li><strong>Free to Use:</strong> Enjoy our core features at no cost.</li>
          </ul>
        </div>

        {/* Right Side: Feedback Form and Social Links */}
        <div className="col-md-4">
          <div className="feedback-section p-4 border rounded shadow mb-4">
            <h3>User Feedback</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={feedback.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Feedback</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="3"
                  value={feedback.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit Feedback</button>
            </form>
          </div>

          <div className="social-links text-center">
            <h3>Connect with Us</h3>
            <div className="d-flex justify-content-center">
              <a href="#" className="btn btn-primary mx-2">Facebook</a>
              <a href="#" className="btn btn-info mx-2">Twitter</a>
              <a href="#" className="btn btn-danger mx-2">Instagram</a>
              <a href="#" className="btn btn-dark mx-2">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
