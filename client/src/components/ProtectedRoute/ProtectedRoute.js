import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isAuth) {
          return <Component />;
        } else {
          <Redirect to={{ pathname: "/", state: { from: location } }} />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
