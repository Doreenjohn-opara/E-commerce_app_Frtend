import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div className="d-flex vh-100">
    <div className='left-side d-flex flex-column justify-content-around align-items-left text-light w-50 p-5 font-aeonik'>
    <div className="d-flex flex-column align-items-left justify-content-center h-100">
      <h2 className='mb-4'>KOP MALL</h2>
      <h3 className='mb-3'>Verification Failed!</h3>
      <p>There was an error verifying your account. Please try again.</p>
      <Link to="/login" className="btn btn-warning" style={{width: "200px"}}>Go to Login</Link>
      </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center w-50 bg-light">
        <img
          src="../../../images/essentials/verificationFailed.png"
          alt="Verification illustration"
          className="mb-4" style={{ width: "500px"}}
        />
      </div>
    </div>
  );
};

export default ErrorPage;
