import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import LoginModal from "../../models/LoginModel/Loginpage";
import SignupModal from "../../models/SignupModel/Signup";

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [islogin, setIsLogin] = useState(false); 
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

  return (
    <>
      <section className="Navbar" id="Navbar">
        <div className="navbar">
          <div className="brand">BrightMind.</div>

          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
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
