import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children}) => {
  const isLoggedIn = localStorage.getItem("LoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoutes;
