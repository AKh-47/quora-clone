import React, { ReactElement } from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Auth from "../Auth";

export default function PrivateRoute({
  component: Component,
  ...rest
}: any): ReactElement {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      component={(props) => {
        if (currentUser) {
          return <Component {...props} />;
        } else {
          return <Auth />;
        }
      }}
    />
  );
}
