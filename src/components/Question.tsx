import React, { ReactElement, useState } from "react";
import "../styles/question.scss";

import { Link } from "react-router-dom";
import { useQuestions } from "../context/QuestionContext";

interface Props {
  text: string;
  upvotes: number;
  id: string;
  user: any;
}

export default function Question({
  text,
  upvotes,
  id,
  user,
}: Props): ReactElement {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const { upvote, downwote } = useQuestions();

  const toggleUpvote = () => {
    if (!upvoted) {
      upvote("question", id);
    } else {
      upvote("question", id, true);
    }
    setUpvoted((prev) => !prev);
  };

  const toggleDownvote = () => {
    if (!downvoted) {
      downwote("question", id);
    } else {
      downwote("question", id, true);
    }
    setDownvoted((prev) => !prev);
  };

  return (
    <div className="question">
      <Link to={`/profile/${user?.id}`}>
        <h2>
          <img src={user?.photo} alt="User" />
          <p>{user?.firstName + " " + user?.lastName}</p>
        </h2>
      </Link>
      <h3>{text}</h3>
      <div className="question__bottom">
        <aside>
          <span
            onClick={toggleUpvote}
            style={{ color: upvoted ? "orangered" : "" }}
          >
            <i className="fas fa-arrow-up"></i>{" "}
            {upvoted ? upvotes + 1 : upvotes}
          </span>
          <span
            onClick={toggleDownvote}
            style={{ color: downvoted ? "blue" : "" }}
          >
            <i className="fas fa-arrow-down"></i>
          </span>
        </aside>
      </div>
    </div>
  );
}
