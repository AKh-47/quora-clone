import React, { ReactElement } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";
import PrivateRoute from "./components/utils/PrivateRoute";

import AuthProvider from "./context/AuthContext";
import QuestionProvider from "./context/QuestionContext";
import UserProvider from "./context/UserContext";

export default function App(): ReactElement {
  return (
    <React.Fragment>
      <Router>
        <AuthProvider>
          <UserProvider>
            <QuestionProvider>
              <Switch>
                <PrivateRoute path="/" component={Home} />
              </Switch>
            </QuestionProvider>
          </UserProvider>
        </AuthProvider>
      </Router>
    </React.Fragment>
  );
}
