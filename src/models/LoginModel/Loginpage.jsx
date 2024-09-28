import React, { useState, useEffect } from "react";
import "./Loginpage.css";
import { toast } from "react-toastify";
import cross from "../../assets/images/cross.gif";

const LoginModal = ({ onClose, openSignupModal, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const API = import.meta.env.VITE_BRIGHT_URL;
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login Successful");
        localStorage.setItem("authToken", data.token);

        onLoginSuccess();

        onClose();
      } else {
        toast.error(data.msg || data.message);
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const inputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignupRedirect = () => {
    onClose();
    openSignupModal();
  };

  return (
    <div className="login modal-overlay">
      <div className="modal">
        <h2>Login</h2>
        <img src={cross} alt="Close" onClick={onClose} />
        <form onSubmit={submitForm}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={inputChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={inputChange}
            required
          />
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <button className="newAcc" onClick={handleSignupRedirect}>
          Create new account
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
