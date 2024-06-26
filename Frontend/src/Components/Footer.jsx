import React from "react";
import Logo from "../assets/images/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h1 className="logo-text">OLEX</h1>
          </div>
          <div className="footer-address">
            <h1 className="address-text">
              1501 West Tower, Philippine Stock Exchange Centre, Exchange Road, Ortigas Center, Pasig City, Philippines 1605
            </h1>
          </div>
          <div className="footer-social">
            <div className="social-links">
            <a href="javascript:void(0)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.6348 20.7273V12.766H16.3582L16.7668 9.66246H13.6348V7.68128C13.6348 6.78301 13.8881 6.17085 15.2029 6.17085L16.877 6.17017V3.39424C16.5875 3.35733 15.5937 3.27273 14.437 3.27273C12.0216 3.27273 10.368 4.71881 10.368 7.37391V9.66246H7.63636V12.766H10.368V20.7273H13.6348Z"
                    fill="#68769F"
                  />
                </svg>
              </a>
              {/* Other social media icons */}
            </div>
          </div>
          <div className="footer-copyright">
            <p className="copyright-text">
              ©{new Date().getFullYear()}, OLEX. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
