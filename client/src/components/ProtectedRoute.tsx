import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

interface ProtectedRouteProps {
  element: React.ComponentType;
  current_route: string; // Optional: use this to provide additional logic if needed
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Element,
  current_route,
}) => {
  const isFormComplete = useSelector(
    (state) => state.formCompletion.isFormComplete
  );

  // If form is not complete, redirect to the login page or any other appropriate page
  if (!isFormComplete) {
    return <Navigate to={current_route} replace />;
  }

  // Otherwise, render the provided element
  return <Element />;
};

export default ProtectedRoute;
