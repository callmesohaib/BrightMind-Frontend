import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import LoginModal from "../../models/LoginModel/Loginpage";
import SignupModal from "../../models/SignupModel/Signup";
import "boxicons"; // Import Boxicons if needed

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [islogin, setIsLogin] = useState(false);
  const [navActive, setNavActive] = useState(false); // State to control nav visibility
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const Logout = () => {
    localStorage.removeItem("authToken");
    setIsLogin(false);
    navigate("/");
  };

  const handleLoginSuccess = () => {
    setIsLogin(true);
    closeLoginModal();
  };

  const handleCoursesClick = (e) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      e.preventDefault();
      openLoginModal();
    }
  };

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  return (
    <>
      <section className="Navbar" id="Navbar">
        <div className="navbar">
          <div className="brand">BrightMind.</div>

          <span className="menu-btn" onClick={toggleNav}>
            <i className="bx bx-menu"></i> {/* Boxicon menu icon */}
          </span>

          <ul className={`nav-links ${navActive ? "active" : ""}`}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setNavActive(false)} // Close nav on link click
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setNavActive(false)} // Close nav on link click
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                onClick={handleCoursesClick}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setNavActive(false)} // Close nav on link click
              >
                Courses
              </NavLink>
            </li>
          </ul>

          <div className="btns">
            {islogin ? (
              <button className="loginBtn btn" onClick={Logout}>
                Logout
              </button>
            ) : (
              <>
                <button className="loginBtn btn" onClick={openLoginModal}>
                  Login
                </button>
                <button className="signupBtn btn" onClick={openSignupModal}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {isSignupModalOpen && (
        <SignupModal
          onClose={closeSignupModal}
          openLoginModal={openLoginModal}
        />
      )}
    </>
  );
};

export default Navbar;
