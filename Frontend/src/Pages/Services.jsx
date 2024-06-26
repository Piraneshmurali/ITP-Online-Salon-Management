import React from 'react';
import "./Services";
import serviceimg from "../assets/images/sec.jpg"; // Replace with the actual file path
import "./Services.css";

const Services = () => {
  return (
    <div className="services-container">
      <div className="container">
        <div className="service-info">
          <div className="service-details">
            <h1 className="service-heading">SERVICES</h1>
            <h1 className="service-title">Upgrade your style.</h1>
            <p className="service-description">
              Look and feel better from head to toe with our range of services. From haircuts to massages and overall grooming, treat yourself to a day at Bruno's Barbers.
            </p>
            <div className="service-buttons">
              <a href="#" className="view-packages-btn">View Packages</a>
              <a href="#" className="book-online-btn">Book online</a>
            </div>
          </div>
          <div className="service-image">
            <img
              src={serviceimg}
              alt="Hair Salon"
              className="service-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
