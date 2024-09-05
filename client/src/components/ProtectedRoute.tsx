import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

interface ProtectedRouteProps {
  element: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Element,
}) => {
  const isFormComplete = useSelector(
    (state) => state.formCompletion.isFormComplete
  );

  // If form is not complete, redirect to the login page or any other appropriate page
  if (!isFormComplete) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the provided element
  return <Element />;
};

export default ProtectedRoute;
