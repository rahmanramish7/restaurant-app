import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="banner">
          <div className="top">
            <h1 className="heading">ABOUT US</h1>
            <p>THE ONLY THING WE ARE SERIOUS ABOUT IS FOOD.</p>
          </div>
          <p className="mid">
          <h1>WELCOME TO SYED'S RESTAURANT, WHERE FLAVORS THRIVE IN AN ENCHANTING AMBIANCE IN THE HEART OF [CITY/NEIGHBORHOOD]! FOUNDED ON A LOVE FOR EXTRAORDINARY CUISINE AND A DEVOTION TO WARM HOSPITALITY, SYED'S BELIEVES EACH MEAL SHOULD BE A CELEBRATION OF TASTE, FRESHNESS, 
</h1>  </p>
          <Link to="/">
            <span>Explore Menu</span>
            <HiOutlineArrowRight />
          </Link>
        </div>
        <div className="banner">
          <img src="/about.png" alt="About our restaurant" />
        </div>
      </div>
    </section>
  );
};

export default About;
