import React from 'react';
import "./Testimonial";

const Testimonials = () => {
  const testimonials = [
    {
      avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      name: "Martin Escobar",
      title: "Founder of Meta",
      quote: "Olex Salon Barber Shop delivers top-notch service with precision and style. They've mastered the art of grooming, leaving me looking and feeling fantastic after every visit. Highly recommended!"
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/79.jpg",
      name: "Angela Stian",
      title: "Product Designer",
      quote: "Olex Salon Barber Shop delivers top-notch service with precision and style. They've mastered the art of grooming, leaving me looking and feeling fantastic after every visit. Highly recommended!"
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
      name: "Karim Ahmed",
      title: "DevOps Engineer",
      quote: "Olex Salon Barber Shop delivers top-notch service with precision and style. They've mastered the art of grooming, leaving me looking and feeling fantastic after every visit. Highly recommended!"
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h3 className="testimonials-title">See what others are saying about us</h3>
          <p className="testimonials-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et est hendrerit, porta nunc vitae, gravida justo. Nunc fermentum magna lorem, euismod volutpat arcu volutpat et.
          </p>
        </div>
        <div className="testimonials-list">
          <ul className="testimonials-grid">
            {testimonials.map((item, idx) => (
              <li key={idx} className="testimonial-item">
                <figure>
                  <div className="avatar-wrapper">
                    <img src={item.avatar} className="avatar" alt={`${item.name}'s avatar`} />
                    <div className="user-info">
                      <span className="user-name">{item.name}</span>
                      <span className="user-title">{item.title}</span>
                    </div>
                  </div>
                  <blockquote>
                    <p className="testimonial-quote">{item.quote}</p>
                  </blockquote>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
