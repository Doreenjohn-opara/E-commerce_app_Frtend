import React, { useState, useEffect, useContext } from "react";
import TextInput from "../../components/partials/inputs/Text.input";
import PasswordInput from "../../components/partials/inputs/Password.input";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hook/useAuth.hook";
import { authService } from "../../services/Auth.service";
import { NotificationContext } from "../../context/Notification.context";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useAuth();
    const { showNotification } = useContext(NotificationContext);


  // Load saved credentials
  useEffect(() => {
    if (rememberMe) {
      setEmail(localStorage.getItem("email") || "");
      setPassword(localStorage.getItem("password") || "");
    }
  }, [rememberMe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "AUTH_START" })
    try {
      const response = await authService.login(email, password);

      if (response.token) {  // Ensure the token exists
        localStorage.setItem("token", response.token); // Store the token
        localStorage.setItem("userId", response.data._id);
    };
    
      dispatch({ type: "AUTH_SUCCESS", payload: response.user })
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true")
        localStorage.setItem("email", email)
        localStorage.setItem("password", password)
      } else {
        localStorage.removeItem("rememberMe")
        localStorage.removeItem("email")
        localStorage.removeItem("password")
      }
      showNotification('user logged in successfully', 'success')
      navigate("/")
    } catch (error: any) {
      dispatch({ type: "AUTH_FAILURE", payload: error.response?.data?.message || "Login failed" })
      showNotification('Login Failed', 'error')
    } finally {
        setLoading(false) // Set loading to false when the signup process ends
      }
  }

  return (
    <>
      <div className="d-flex vh-100">
        {/* Left Side */}
        <div className="left-side d-flex flex-column justify-content-center align-items-left text-light w-50 p-5 font-aeonik">
          <h1 className="mb-4 fs-4">KOP MALL</h1>
          <h2 className="mb-4 fs-4">Log in to your account</h2>
          <p className="text-md-left mb-4">
            Welcome Back! Select a method to Login
          </p>
          <div className="d-flex gap-3 mb-4">
            <button className="signup-btn d-flex align-items-center gap-2 w-50 font-aeonik">
              <img
                src="../../../images/essentials/7123025_logo_google_g_icon.png"
                alt="Google"
                style={{ width: "30px", textDecoration: "white" }}
              />
              Login with Google
            </button>
            <button className="signup-btn d-flex align-items-center gap-2 w-50">
              <img
                src="../../../images/essentials/apple.png"
                alt="Apple"
                style={{ width: "20px" }}
              />
              Login with Apple
            </button>
          </div>
          <div className="d-flex justify-content-center gap-5">
            <hr className="w-25 "/>
                <p className="text-md-center mt-1">OR</p>
            <hr className="w-25"/>
          </div>
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="mb-3">
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
            <div className="mb-3">
              <PasswordInput
                text=""
                placeholder="Password"
                hasIcon={false}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                transparent={true}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe" className="form-check-label">
                  Remember Me
                </label>
              </div>
              <Link 
                  to="/forgot-password"
                  className='brand-yellow fs-16 font-aeonik ml-1'
                  >
                    Forgot Password?
              </Link>
            </div>
            <button type="submit" className="signup-btn w-100 mt-5" disabled={loading}>
            {loading ? (
            <>
              <Spinner animation="border" size="sm" /> {/* Loading spinner */}
              Logging in...
            </>
          ) : (
            "Login"
          )}
            </button>
          </form>
          <p className="fs-16 font-aeonik mt-4 text-center">
            Don't have an Account?{" "}
            <Link
              to="/signup"
              className="brand-yellow fs-16 font-aeonik-bold text-decoration-none ml-1">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right Side */}
        <div className="d-flex flex-column justify-content-center align-items-center w-50 bg-light">
          <img
            src="../../../images/essentials/login.jpg"
            alt="Tech gadgets illustration"
            className="mb-4"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
