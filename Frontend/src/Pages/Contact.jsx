import React, { useState } from 'react';
import heroing from "../assets/images/whychoose.jpg";
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can add the logic to submit the form data
    console.log({
      name,
      email,
      phone,
      subject,
      message,
    });
  };

  return (
    <div className="contact-container">
      <div
        className="contact-bg"
        style={{ backgroundImage: `url(${heroing})` }}
      />
      <div className="contact-content">
        <h2 className="contact-heading">Get in Touch</h2>
        <p className="contact-description">
          We wish to serve you better. Leave us your comments and suggestions below to
          help us improve our service. For inquiries and concerns, you may also reach us by
          filling out the same form below.
        </p>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name*
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Contact Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="form-input"
            >
              <option value="">Select a subject</option>
              <option value="careers">Careers</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Your Message*
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-input"
              rows={5}
              required
            />
          </div>
          <button
            type="submit"
            className="contact-button"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
