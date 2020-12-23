import React, { ReactElement, useState } from "react";
import { Switch, Route } from "react-router-dom";
import AddQuestion from "./AddQuestion";
import Feed from "./Feed";
import Header from "./Header";
import Profile from "./Profile";

interface Props {}

export default function Home({}: Props): ReactElement {
  const [addQuestion, setAddQuestion] = useState(false);

  return (
    <div className="home">
      <Header openAddQuestion={() => setAddQuestion(true)} />
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Feed openAddQuestion={() => setAddQuestion(true)} />
          )}
        />
        <Route path="/profile/:id" component={Profile} />
      </Switch>
      <AddQuestion
        isOpen={addQuestion}
        closeModal={() => setAddQuestion(false)}
      />
    </div>
  );
}
