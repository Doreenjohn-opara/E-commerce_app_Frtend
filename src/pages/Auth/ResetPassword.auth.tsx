import React, { useContext, useState } from "react";
import TextInput from "../../components/partials/inputs/Text.input";
import PasswordInput from "../../components/partials/inputs/Password.input";
import "bootstrap/dist/css/bootstrap.min.css";
import AlertNotification from "../../components/partials/notification/notification";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { useAuth } from "../../Hook/useAuth.hook";
import { authService } from "../../services/Auth.service";
import { NotificationContext } from "../../context/Notification.context";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false); // Loading state
  const { showNotification } = useContext(NotificationContext);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showNotification( "Passwords do not match", "error" );
      return;
    }

    if (newPassword.length < 8) {
      showNotification("Password must be at least 8 characters long", "error");
      return;
    }

    const token = searchParams.get("token"); // Get token from URL query parameters
    const userId = searchParams.get("id"); // Get user ID from URL query parameters

    if (!token || !userId) {
      showNotification(
         "Invalid reset password request. Missing token or user ID.", "error"
      );
      return;
    }

    dispatch({ type: "AUTH_START" });
    setLoading(true); // Set loading to true when the request starts
    try {
      await authService.resetPassword(token, userId, newPassword);
      dispatch({ type: "AUTH_SUCCESS", payload: null });
      showNotification("Password reset successful. Please log in with your new password.", "success");
      navigate("/login");
    } catch (error: any) {
      dispatch({
        type: "AUTH_FAILURE",
        payload: error.response?.data?.message || "Failed to reset password",
      });
      showNotification( "Failed to reset password", "error");
    } finally {
      setLoading(false); // Set loading to false when the request ends
    }
  };

  return (
    <>
      <div className="d-flex vh-100">
        {/* Left Side */}
        <div className="left-side d-flex flex-column justify-content-center align-items-left text-light w-50 p-5 font-aeonik">
          <h1 className="mb-4 fs-4">KOP MALL</h1>
          <h2 className="mb-4 fs-4">Change Password</h2>
          <p className="text-md-left mb-4">Enter your new password</p>
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="mb-3">
              <PasswordInput
                text=""
                placeholder="New Password"
                hasIcon={false}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                transparent={true}
              />
            </div>
            <div className="mb-3">
              <TextInput
                text=""
                placeholder="Confirm New Password"
                type="text"
                hasIcon={false}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                transparent={true}
              />
            </div>
            <button type="submit" className="signup-btn w-100 mt-5" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Continue"}
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="d-flex flex-column justify-content-center align-items-center w-50 bg-light">
          <img
            src="../../../images/essentials/newPassword.jpg"
            alt="Tech gadgets illustration"
            className="mb-4"
          />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
