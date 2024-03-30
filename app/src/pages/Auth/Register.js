import React, { useState } from 'react';
import './Auth.css';
import axios from 'axios';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { BASE_URL } from '../../config';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message,{
          autoClose:6000,
             onClose: navigate("/login")
             
        })
      } else {
        toast.error(res.data.message,{
          autoClose:3000
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={'register'}>
      <div className="container-fuild top-0 d-flex justify-content-center align-items-center vh-100 ">
        <div className='row'>
        <div className="col-md-8 col-lg-6">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="card-title text-center mb-4 fw-300">Register</h3>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                    <input
                      type="text"
                      className="form-control form-input"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-envelope"></i></span>
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
                    <span className="input-group-text"><i className="fas fa-lock"></i></span>
                    <input
                      type="password"
                      className="form-control form-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-phone"></i></span>
                    <input
                      type="text"
                      className="form-control form-input"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-map-marker-alt"></i></span>
                    <input
                      type="text"
                      className="form-control form-input"
                      placeholder="Enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-question"></i></span>
                    <input
                      type="text"
                      className="form-control form-input"
                      placeholder="Enter your security answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group p-2">
                  <button type="submit" className="btn btn-dark btn-block p-3 pe-4 ps-4">Register</button>
                </div>
              </form>
              <div className="form-group">
                <NavLink to="/login" className="text-decoration-none"><i className="fas fa-sign-in-alt me-1"></i>Already have an account? Login</NavLink>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
