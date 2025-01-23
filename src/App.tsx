import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Auth/Signup.auth';
import Login from './pages/Auth/Login.auth';
import ForgotPassword from './pages/Auth/ForgotPassword.auth';
import VerifyToken from './pages/Auth/VerifyToken.auth';
import ResetPassword from './pages/Auth/ResetPassword.auth';
import MasterLayout from './components/Layouts/MasterLayout/masterLayout';

const App: React.FC = () => {

  return (
    <Router>
        <div className='app'>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>
            <Route path="/verify-token" element={<VerifyToken />}/>
            <Route path="/reset-password" element={<ResetPassword />}/>
            <Route path="/" element={<MasterLayout />}>
                {/* <Route path="" element={<Dashboard />} /> */}

            </Route>
          </Routes>
        </div>
    </Router> 
  );
}

export default App;
