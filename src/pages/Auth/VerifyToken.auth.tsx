import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../Hook/useAuth.hook";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/Auth.service";
import Spinner from "react-bootstrap/esm/Spinner";
import  AlertNotification from "../../components/partials/notification/notification";


const VerifyToken: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(40);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false) // State for loading
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { dispatch } = useAuth()
  const navigate = useNavigate()
  

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Ensure only one digit
    setOtp(newOtp);

    // Auto-focus the next input
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleResendCode = async () => {
    if (canResend) {
      setTimer(40);
      setCanResend(false);

      // Simulate an API call to resend the token
      setNotification({ message: "Verification token has been resent.", type: 'success' });
    }
  };

  const handleVerifyToken = async () => {
    if (otp.includes("")) {
        setNotification({ message: "Please fill in all OTP fields.", type: 'error' });
        return;
    }

    const enteredOtp = otp.join("");
    setLoading(true) // Set loading to true when the request starts
    dispatch({ type: "AUTH_START" })
    try {
      await authService.verifyToken(enteredOtp)
      dispatch({ type: "AUTH_SUCCESS", payload: null })
      navigate("/change-password")
    } catch (error: any) {
      dispatch({ type: "AUTH_FAILURE", payload: error.response?.data?.message || "Invalid OTP" })
      setNotification({ message: "Invalid OTP. Please try again.", type: 'error' });
    } finally {
        setLoading(false) 
      }
  };

  return (
    <div className="d-flex vh-100">
        {/* Left Side */}
        <div className="left-side d-flex flex-column justify-content-around align-items-left text-light w-50 p-5 font-aeonik">
        {notification && (
        <div className="position-fixed top-0 start-50 translate-middle-x" style={{ zIndex: 1050 }}>
          <AlertNotification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        </div>
      )}
        <div className="d-flex flex-column align-items-left justify-content-center h-100">
            <h2 className="mb-4">KOP MALL</h2>
            <h4 className="mb-3">Verify your account</h4>
            <p>Enter the four digit code we have sent to you</p>

            {/* OTP Inputs */}
            <div className="d-flex justify-content-center gap-3 my-4">
            {otp.map((value, index) => (
                <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="form-control text-center"
                style={{ width: "50px", height: "50px", fontSize: "1.5rem", border: "2px solid white", backgroundColor: "transparent", color: "white" }}
                />
            ))}
            </div>

            {/* Reset Password Button */}
            <button
            className="btn btn-outline-warning px-5 py-2"
            onClick={handleVerifyToken}
            disabled={loading}
            >
            {loading ? (
            <>
              <Spinner animation="border" size="sm" /> {/* Loading spinner */}
              Verifying...
            </>
          ) : (
            "Verify Token"
          )}
            </button>

            {/* Resend Code */}
            <p className="mt-5 text-center">
            {canResend ? (
                <span className="text-warning" style={{ cursor: "pointer" }} onClick={handleResendCode}>
                Resend code
                </span>
            ) : (
                <span>Resend code in {timer}s</span>
            )}
            </p>
        </div>
        </div>

        {/* Right side */}
        <div className="d-flex flex-column justify-content-center align-items-center w-50 bg-light">
          <img
            src="../../../images/essentials/otp.jpg"
            alt="Tech gadgets illustration"
            className="mb-4"
          />
        </div>
    </div>
  );
};

export default VerifyToken;
