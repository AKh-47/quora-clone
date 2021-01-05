import React, { ReactElement, useEffect } from "react";
import "../styles/feed.scss";

import { useAuth } from "../context/AuthContext";
import { useQuestions } from "../context/QuestionContext";

import Question from "./Question";

export default function Feed({ openAddQuestion }): ReactElement {
  const { currentUser } = useAuth();

  const { questions, fetchQuestions } = useQuestions();

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="feed">
      <div onClick={openAddQuestion} className="feed__add-ques">
        <h2>
          <img src={currentUser.photo} alt="User" />
          <p>{currentUser.firstName + " " + currentUser.lastName}</p>
        </h2>
        <aside>What is your question or link?</aside>
      </div>
      {questions.map((ques) => (
        <Question {...ques} />
      ))}
    </div>
  );
}
