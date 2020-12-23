import React, { ReactElement } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";
import PrivateRoute from "./components/utils/PrivateRoute";

import AuthProvider from "./context/AuthContext";
import UserProvider from "./context/UserContext";

export default function App(): ReactElement {
  return (
    <React.Fragment>
      <Router>
        <AuthProvider>
          <UserProvider>
            <Switch>
              <PrivateRoute path="/" component={Home} />
            </Switch>
          </UserProvider>
        </AuthProvider>
      </Router>
    </React.Fragment>
  );
}
