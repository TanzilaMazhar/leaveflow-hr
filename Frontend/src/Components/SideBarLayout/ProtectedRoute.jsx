import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthSessionActive } from "../../authSession";

const ProtectedRoutes = ({ children}) => {
  if (!isAuthSessionActive()) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoutes;
