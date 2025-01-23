import React, { useState } from "react";
import TextInput from "../../components/partials/inputs/Text.input";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hook/useAuth.hook";
import { authService } from "../../services/Auth.service";
import Spinner from "react-bootstrap/esm/Spinner";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { dispatch } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false) // State for loading

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true) // Set loading to true when the request starts
        dispatch({ type: "AUTH_START" })
        try {
          await authService.forgotPassword(email)
          dispatch({ type: "AUTH_SUCCESS", payload: null })
          navigate("/verify-token")
        } catch (error: any) {
          dispatch({ type: "AUTH_FAILURE", payload: error.response?.data?.message || "Failed to send reset email" })
        } finally {
          setLoading(false);
        }
      }

    return (
        <>
        <div className="d-flex vh-100">
        {/* Left Side */}
        <div className="left-side d-flex flex-column justify-content-around align-items-left text-light w-50 p-5 font-aeonik">
          <div>
          <h1 className="mb-4 fs-4 font-aeonik-bold">KOP MALL</h1>
          <h2 className="mb-4 fs-4 font-aeonik-bold">Forgot password</h2>
          <p className="text-md-left mb-4">
            Enter your registered email address associated with your account and a reset link would be sent to your mail
          </p>
          <form className="w-100 d-flex flex-column gap-5" onSubmit={handleSubmit}>
            <div className="">
              <TextInput
                text=""
                placeholder="Email Address"
                type="text"
                hasIcon={false}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                transparent={true}
              />
            </div>
            <button type="submit" className="signup-btn w-100" disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> {/* Loading spinner */}
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
            </button>
          </form>
          </div>
          <Link 
                  to="/login"
                  className='brand-yellow fs-16 text-center font-aeonik mt-5'
                  >
                    Back to Login
              </Link>
        </div>

        {/* Right Side */}
        <div className="d-flex flex-column justify-content-center align-items-center w-50 bg-light">
          <img
            src="../../../images/essentials/forgot_password.jpg"
            alt="Tech gadgets illustration"
            className="mb-4"
          />
        </div>
      </div>
        </>
    )
}

export default ForgotPassword;