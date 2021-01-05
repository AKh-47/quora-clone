import React, { ReactElement } from "react";
import "../styles/header.scss";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { useAuth } from "../context/AuthContext";

export default function Header({ openAddQuestion }): ReactElement {
  const { currentUser } = useAuth();

  return (
    <header className="header">
      <h1>Quora</h1>
      <input placeholder="Search Quora" type="text" />
      <Popup
        trigger={<img src={currentUser.photo} alt="User" />}
        position="bottom center"
      >
        <div className="user-dropdown">
          <div className="user-dropdown__top">
            <img src={currentUser.photo} />
            <h1>{currentUser.firstName + " " + currentUser.lastName}</h1>
          </div>
        </div>
      </Popup>
      <button onClick={openAddQuestion}>Add Question</button>
    </header>
  );
}
