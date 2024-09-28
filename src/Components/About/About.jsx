import React from "react";
import Navbar from "../Navbar/Navbar";
import "./About.css";

const About = () => {
  return (
    <>
      <Navbar />
      <section className="about" id="about">
        <div className="about-container">
          <div className="about-content">
            <h1>Why choose Us</h1>
            <div className="about-lines">
              <p>Offer Multiple Courses</p>
              <p>Get Certificates After Getting Course</p>
              <p>Learn at Your Own Pace</p>
              <p>Access to Free and Paid Content</p>
              <p>Mobile-Friendly Learning Platform</p>
              <p>Interactive Quizzes</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
