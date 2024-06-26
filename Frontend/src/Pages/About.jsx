import React from "react";
import "./About.css";
import img1 from "../assets/images/gal5.jpg";
import img2 from "../assets/images/gal1.jpg";
import img3 from "../assets/images/gal2.jpg";

const About = () => {
  return (
    <>
      <section className="about-section">
        <div className="container">
          <div className="flex-container">
            <div className="image-column">
              <img src={img3} alt="" className="about-image" />
              <img src={img2} alt="" className="about-image" />
            </div>
            <div className="content-column">
              <div className="content">
                <span className="title">Why Choose Us</span>
                <h2 className="heading">
                  Experience the Olex Difference.
                </h2>
                <p className="description">
                  Choosing Olex Barber Shop means opting for an experience tailored to perfection. Our commitment to excellence is reflected in every aspect of our service, from the moment you step through the door. With skilled barbers who are not only masters of their craft but also dedicated to understanding your unique style preferences, we guarantee a haircut that exceeds your expectations.
                </p>
                <p className="description">
                  At Olex, we prioritize precision, attention to detail, and customer satisfaction above all else. Moreover, our welcoming atmosphere and personalized approach ensure that every visit feels like a rejuvenating escape. Trust Olex Barber Shop for an unparalleled grooming experience that leaves you looking and feeling your absolute best.
                </p>
                <a href="#" className="cta-button">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
