import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/Auth.service";
import { useParams } from "react-router-dom";
import { NotificationContext } from "../../context/Notification.context";
import AlertNotification from "../../components/partials/notification/notification";

const VerifyToken: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);
  const { token } = useParams();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        showNotification( "Invalid or missing token.", "error" );
        navigate("/error");
        return;
      }

      setLoading(true);
      try {
        await authService.verifyToken(token);
        navigate("/success"); // Redirect to SuccessPage if token is valid
      } catch (error: any) {
        showNotification("Token verification failed.", "error");
        navigate("/error"); // Redirect to ErrorPage if token is invalid
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div className="d-flex vh-100">
      <div className="left-side d-flex flex-column justify-content-around align-items-left text-light w-50 p-5 font-aeonik">
        <div className="d-flex flex-column align-items-left justify-content-center h-100">
          <h2 className="mb-4">KOP MALL</h2>
          <h4 className="mb-3">Verifying your token...</h4>
          {loading && <p>Please wait while we verify your account.</p>}
          {!loading && (
            <p>If the verification is successful, you will be redirected shortly.</p>
          )}
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center w-50 bg-light">
        <img
          src="../../../images/essentials/verify_token.png"
          alt="Verification illustration"
          className="mb-4" style={{ width: "500px"}}
        />
      </div>
    </div>
  );
};

export default VerifyToken;
