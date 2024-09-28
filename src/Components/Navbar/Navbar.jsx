import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import LoginModal from "../../models/LoginModel/Loginpage";
import SignupModal from "../../models/SignupModel/Signup";
import "boxicons";

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [islogin, setIsLogin] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const openLoginModal = () => {
    setIsSignupModalOpen(false);
    setNavActive(false)
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsLoginModalOpen(false);
    setNavActive(false)
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
    setNavActive(false);
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
            <i className="bx bx-menu"></i>
          </span>

          <ul className={`nav-links ${navActive ? "active" : ""}`}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setNavActive(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setNavActive(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                onClick={handleCoursesClick}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Courses
              </NavLink>
            </li>

            <li>
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
            </li>
          </ul>
        </div>
      </section>

      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          onLoginSuccess={handleLoginSuccess}
          openSignupModal={openSignupModal}
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
