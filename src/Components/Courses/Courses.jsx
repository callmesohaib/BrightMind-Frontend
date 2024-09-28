import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

const Courses = ({ openLoginModal }) => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      openLoginModal();
      return;
    } else {
      fetchCourses();
    }
  }, [openLoginModal]);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/data/courses");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const QuizPage = (coursename) => {
    navigate("/quizes", { state: { coursename } });
  };

  return (
    <div>
      <Navbar />
      <section className="course" id="course">
        <div className="course-container">
          {courses.map((course, index) => (
            <div className="course-box" key={index}>
              <div
                className="course-image"
                dangerouslySetInnerHTML={{ __html: course.img }}
              />
              <h2>{course.coursename}</h2>
              <p>{course.description}</p>
              <button onClick={() => QuizPage(course.coursename)}>
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Courses;
