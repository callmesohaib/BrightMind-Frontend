import React, { useState, useEffect } from "react";
import "./Signup.css";
import { toast } from "react-toastify";
import cross from "../../assets/images/cross.gif";

const SignupModal = ({ onClose, openLoginModal }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const API = import.meta.env.VITE_BRIGHT_URL;
  const inputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      toast.success("Success! Your account is ready. You can now log in.");
    } else {
      toast.error(data.message || data.msg);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleLoginRedirect = () => {
    onClose();
    openLoginModal();
  };

  return (
    <div className="login modal-overlay">
      <div className="modal">
        <h2>SignUp</h2>
        <img src={cross} alt="Close" onClick={onClose} />
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={inputChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={inputChange}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
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
            Signup
          </button>
        </form>
        <button className="newAcc" onClick={handleLoginRedirect}>
          Already have an account?
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
