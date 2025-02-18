import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const CheckEmail: React.FC = () => {

  return (
    <>
    <div className="d-flex vh-100">
    <div className="left-side d-flex flex-column justify-content-around align-items-left text-light w-50 p-5 font-aeonik">
      <div className="d-flex flex-column align-items-left justify-content-center h-100">
        <h2 className="mb-4 font-aeonik-bold">KOP MALL</h2>
        <h4 className="mb-3 font-aeonik-bold">Check your email</h4>
        <p>We've sent you a magic link. Click this link to verify your account.</p>
        </div>
        <Link
          to='/forgot-password'
          className="text-center text-warning mb-5"
        >
          I didn't recieve this email
        </Link>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center w-50 bg-light">
        <img
          src="../../../images/essentials/check-email.png"
          alt="Check Email illustration"
          className="mb-4" style={{ width: "600px"}} />
      </div>
      </div>
      </>
  );
};

export default CheckEmail;
