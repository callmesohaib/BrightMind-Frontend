import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Courses.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Courses = ({ openLoginModal }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_BRIGHT_URL;

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
      
      setLoading(true);

      const response = await fetch(`${API}api/data/courses`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      
      setTimeout(() => {
        setCourses(data);
        setLoading(false);
      }, 1000); 
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setLoading(false); 
    }
  };

  const QuizPage = (coursename) => {
    navigate("/quizes", { state: { coursename } });
  };

  return (
    <div>
      <Navbar />
      <section className="course" id="course">
        {loading ? (
          <Loader/>
        ) : (
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
        )}
      </section>
    </div>
  );
};

export default Courses;
