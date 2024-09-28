import React from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import homeImg from "../../assets/images/homeImg.webp";
import booksGif from "../../assets/images/books.gif";
import addUser from "../../assets/images/add-user.gif";
import certificate from "../../assets/images/certificate.gif";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="home" id="home">
        <div className="heroPart">
          <h1>
            “Tell me and I forget, teach me and I may remember, involve me and I
            learn.”
          </h1>
          <h3>Benjamin Franklin</h3>
        </div>

        <div className="two-grid">
          <div className="homeImg">
            <img src={homeImg} alt="" />
          </div>
          <div className="Benefits-content">
            <h4>Learn Anything</h4>
            <h1>Benefits About Online Learning Expertise</h1>
            <div className="benefit-boxes">
              <div className="benefit-box">
                <div className="benefit-img">
                  <img src={booksGif} alt="" />
                </div>
                <div className="info">
                  <h3>Online Courses</h3>
                  <p>
                    Explore thousands of free and paid online courses to learn
                    anything you want.
                  </p>
                </div>
              </div>
              <div className="benefit-box">
                <div className="benefit-img">
                  <img src={certificate} alt="" />
                </div>
                <div className="info">
                  <h3>Earn A Certificates</h3>
                  <p>
                    Get a certificate after completing a course. This helps you
                    showcase your knowledge.
                  </p>
                </div>
              </div>
              <div className="benefit-box">
                <div className="benefit-img">
                  <img src={addUser} alt="" />
                </div>
                <div className="info">
                  <h3>Learn with Expert</h3>
                  <p>
                    Join thousands of students learning and growing together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
