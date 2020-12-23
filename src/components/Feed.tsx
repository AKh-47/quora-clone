import React, { ReactElement } from "react";
import "../styles/feed.scss";

import { useAuth } from "../context/AuthContext";

export default function Feed({ openAddQuestion }): ReactElement {
  const { currentUser } = useAuth();

  return (
    <div className="feed">
      <div onClick={openAddQuestion} className="feed__add-ques">
        <h2>
          <img src={currentUser.photo} alt="User" />
          <p>{currentUser.firstName + " " + currentUser.lastName}</p>
        </h2>
        <aside>What is your question or link?</aside>
      </div>
      <div className="test">d</div>
      <div className="test">d</div>
    </div>
  );
}
