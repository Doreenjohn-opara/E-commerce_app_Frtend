import type React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useAuth } from "../Hook/useAuth.hook";

const ProtectedRoute: React.FC = () => {
  const { state } = useAuth();

  if (state.isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Loading...</span>
      </div>
    ); // Display a loading spinner with a message
  }

  return state.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;