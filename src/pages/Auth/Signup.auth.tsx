import React, { useContext, useState } from "react";
import TextInput from "../../components/partials/inputs/Text.input";
import PasswordInput from "../../components/partials/inputs/Password.input";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from 'react-bootstrap/Spinner';
import { authService } from "../../services/Auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hook/useAuth.hook";


const Signup = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [phoneCode, setPhoneCode] = useState("+234");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { dispatch } = useAuth()

    const handleSignUp = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "AUTH_START" })
    try {
      const userData = {
        firstName,
        lastName,
        phoneCode,
        phoneNumber,
        email,
        password,
      }

      const response = await authService.register(userData)
      dispatch({ type: "AUTH_SUCCESS", payload: response.user })
      navigate("/login")
    } catch (error: any) {
      dispatch({ type: "AUTH_FAILURE", payload: error.response?.data?.message || "Signup failed" })
    } finally {
      setLoading(false) // Set loading to false when the signup process ends
    }
  }

    return (
      <div className="d-flex vh-100">
        {/* Left Side */}
        <div className="left-side d-flex flex-column justify-content-center align-items-left text-light w-50 p-5 font-aeonik">
          <h1 className="mb-4 fs-4 font-aeonik-bold">KOP MALL</h1>
          <h2 className="mb-4 fs-4">Create your account</h2>
          <p className="text-md-left mb-4">
            Welcome! Select a method to create your account
          </p>
          <div className="d-flex gap-3 mb-4">
            <button className="signup-btn d-flex align-items-center gap-2 w-50 font-aeonik">
              <img
                src="../../../images/essentials/7123025_logo_google_g_icon.png"
                alt="Google"
                style={{ width: "30px", textDecoration: "white"}}
              />
              Sign up with Google
            </button>
            <button className="signup-btn d-flex align-items-center gap-2 w-50">
              <img
                src="../../../images/essentials/apple.png"
                alt="Apple"
                style={{ width: "20px" }}
              />
              Sign up with Apple
            </button>
          </div>
          <div className="d-flex justify-content-center gap-5">
            <hr className="w-25 "/>
                <p className="text-md-center mt-1">OR</p>
            <hr className="w-25"/>
          </div>
          <form className="w-100" onSubmit={handleSignUp}>
            <div className="mb-3 brand-white">
                <TextInput
                text=""
                placeholder="First Name"
                type="text"
                hasIcon={false}
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
                transparent={true}
                />
            </div>
            <div className="mb-3">
            <TextInput
                text=""
                placeholder="Last Name"
                type="text"
                hasIcon={false}
                onChange={(e) => {
                    setlastName(e.target.value);
                }}
                transparent={true}
                />
            </div>
            <div className="mb-3">
            <TextInput
                text=""
                placeholder="Email Address"
                type="email"
                hasIcon={false}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                transparent={true}
                />
            </div>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text text-white bg-transparent">🇳🇬 +234</span>
                <input
                  type="tel"
                  className="form-control bg-transparent"
                  placeholder="Phone number"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>
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
            <button type="submit" className="signup-btn w-100 mt-3" disabled={loading}>
            {loading ? (
            <>
              <Spinner animation="border" size="sm" /> {/* Loading spinner */}
              Signing up...
            </>
          ) : (
            "Sign up"
          )}
            </button>
          </form>
          <p className="fs-16 font-aeonik mt-4 text-center">
                  Already have an Account?{" "} 
                  <Link 
                  to="/login"
                  className='brand-yellow fs-16 font-aeonik text-decoration-none ml-1'
                  >
                    Login
                  </Link>
                </p>
        </div>
  
        {/* Right Side */}
        <div className="d-flex flex-column justify-content-center align-items-center w-50 bg-light">
          <img
            src="../../../images/essentials/left-image.jpg"
            alt="Tech gadgets illustration"
            className="mb-4"
          />
          <p className="text-center">
            Explore a wide range of gadgets and find the perfect tech for your lifestyle.
          </p>
        </div>
      </div>
    );
  };
  

export default Signup;
