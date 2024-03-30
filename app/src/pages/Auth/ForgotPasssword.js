import React, { useState } from 'react';
import './Auth.css';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../../context/auth';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { BASE_URL } from '../../config';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleRest = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (

    <Layout title={'forgot-password'}>
      <div className="container-fuild login-container d-flex justify-content-center align-items-center">
     <div className='row'>
     <div className="col-md-8 col-lg-6">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="card-title text-center mb-4 fw-300">Rest Password</h3>
              <form onSubmit={handleRest}>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text p-3 me-1">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control form-input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text p-3 me-1">
                        <i className="fas fa-question"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control form-input"
                      placeholder="Enter your security Answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text p-3 me-1 ">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    
                    <div className="input-group-append">
                      <span className="input-group-text p-3 ms-1" onClick={togglePasswordVisibility}>
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </span>
                    </div>
                  </div>
                </div>
               
                <div className="form-group p-2">
                  <button type="submit" className="btn btn-dark btn-block p-3 pe-4 ps-4">Login</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>

  );
};

export default ForgotPassword;
