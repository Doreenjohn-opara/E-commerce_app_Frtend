import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  return (
    <div className="d-flex vh-100">
    <div className='left-side d-flex flex-column justify-content-around align-items-left text-light w-50 p-5 font-aeonik'>
    <div className="d-flex flex-column align-items-left justify-content-center h-100">
      <h2 className='mb-4'>KOP MALL</h2>
      <h3 className='mb-3'>Verification Successful!</h3>
      <p>Your account has been successfully verified.</p>
      <Link to="/login" className="btn btn-warning" style={{width: "200px"}}>Go to Login</Link>
      </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center w-50 bg-light">
        <img
          src="../../../images/essentials/verificationSuccess.png"
          alt="Verification Successful illustration"
          className="mb-4" style={{ width: "700px"}}
        />
      </div>
    </div>
  );
};

export default SuccessPage;

{/* <div className="left-side d-flex text-white flex-column justify-content-center align-items-center vh-100">
      <h1>Verification Successful!</h1>
      <p>Your account has been successfully verified.</p>
      <Link to="/login" className="btn btn-warning">Go to Login</Link>
    </div> */}