import React from "react";
import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const isLoggedIn = localStorage.getItem("LoggedIn") === "true";

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default AuthRedirect;
