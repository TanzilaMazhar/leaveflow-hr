import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthSessionActive } from "../../authSession";

const AuthRedirect = ({ children }) => {
  if (isAuthSessionActive()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthRedirect;
