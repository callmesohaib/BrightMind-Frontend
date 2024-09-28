import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Quizes.css";
import Navbar from "../Navbar/Navbar";
import quizData from "../../assets/Json/Quizes.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Quizes = () => {
  const [data, setData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const { coursename } = location.state || {};

  useEffect(() => {
    if (coursename) {
      const filteredData = quizData.questions.filter(
        (quiz) => quiz.category === coursename
      );
      setData(filteredData);
    }
  }, [coursename]);

  const BackNavigate = () => {
    navigate("/courses");
  };

  const handleOptionChange = (questionIndex, value) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  const showResult = () => {
    let unanswered = false;
    const newResults = [];

    data.forEach((quiz, index) => {
      const selectedOption = selectedAnswers[index];
      if (!selectedOption) {
        unanswered = true;
      }
      newResults.push({
        correct: selectedOption === quiz.answer,
      });
    });

    if (unanswered) {
      toast.warn("Please answer all questions before submitting!");
      return;
    }

    setResults(newResults);
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const correctAnswersCount = results
    ? results.filter((result) => result.correct).length
    : 0;

  return (
    <div>
      <Navbar />
      <section className="quizes" id="quizes">
        <h1>{coursename ? `Quiz for ${coursename}` : "Quiz"}</h1>
        <div className="quiz-container">
          {data.length > 0 ? (
            data.map((quiz, index) => (
              <div
                key={index}
                className={`quiz-box ${
                  results
                    ? results[index].correct
                      ? "correct-answer"
                      : "incorrect-answer"
                    : ""
                }`}
              >
                <h3>{quiz.question}</h3>
                <ul className="options">
                  {quiz.options.map((option, idx) => (
                    <li key={idx}>
                      <label>
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          onChange={() => handleOptionChange(index, option)}
                          checked={selectedAnswers[index] === option}
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>Loading quizzes...</p>
          )}
          <div className="btns">
            <button className="btn" onClick={showResult}>
              Submit
            </button>
            <button className="cancel btn" onClick={BackNavigate}>
              Cancel
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Quiz Results</h2>
              <p>
                You got {correctAnswersCount} out of {data.length} correct!
              </p>
              <button onClick={closeModal} className="close-modal-btn">
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Quizes;
