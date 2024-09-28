import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Courses from "./Components/Courses/Courses";
import Quizes from "./Components/Quizes/Quizes";
// import SignupModal from "./models/SignupModel/Signup";
// import LoginModal from "./models/LoginModel/Loginpage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/signup" element={<SignupModal />} />
        <Route path="/login" element={<LoginModal />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/quizes" element={<Quizes />} />
      </Routes>
    </Router>
  );
};

export default App;
