import React from "react";
import { Route, Redirect } from "react-router-dom";

function AdminProtectedRoute({
  isAuth,
  isAdmin,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isAuth && isAdmin) {
          return <Component />;
        } else {
          <Redirect to={{ pathname: "/", state: { from: location } }} />;
        }
      }}
    />
  );
}
export default AdminProtectedRoute;
