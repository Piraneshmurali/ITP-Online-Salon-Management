import React, { useEffect } from "react";
import "./Hero.css";
import heroing from "../assets/images/hero.jpg";
import { FaLocationDot, FaHeadphones } from "react-icons/fa";
import { MdOutlinePhoneAndroid, MdEmail } from "react-icons/md";
import sissor from "../assets/images/sissor.png";
import menshair from "../assets/images/menshair.png";
import trimmer from "../assets/images/trimmer.png";
import womenhair from "../assets/images/womenhair.png";
import AOS from "aos";
import "aos/dist/aos.css";
import Services from "./Services";
import Products from "./Products";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  return (
    <>
    <Navbar/>
      <section
        id="hero"
        className="hero-section"
        style={{
          backgroundImage: `url(${heroing})`,
        }}
      >
        <h1 className="hero-title" data-aos="zoom-in">
          CREATE YOUR OWN <br /> UNIQUE HAIR STORY
        </h1>
        <p className="hero-description" data-aos="zoom-in">
          AWARD WINNING HAIR SALON BASED IN LK
        </p>
        <div className="hero-button" data-aos="fade-up">
          <button className="book-now-button">
            BOOK NOW
          </button>
        </div>
      </section>
      <Services />
      <Products />
      <Footer/>
    </>
  );
};

export default Hero;
