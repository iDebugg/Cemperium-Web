// src/pages/LogInPage.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ToggleSwitch from '../hooks/ToggleSwitch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEmailValid(email)) {
      setLoading(true);
      const deviceToken = "0";
      const userData = { email, password, deviceToken };
  
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_LOGIN_API_URL}`,
          userData
        );
        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem('token', token);
  
          setLoading(false);
          navigate('/Loader');
        } else {
          toast.error('Login failed. Please check your credentials and try again.');
          setLoading(false);
        }
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message || 'An error occurred. Please try again.');
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
        setLoading(false);
      }
  
      setIsFormSubmitted(true);
    } else {
      alert('Incorrect Credentials.');
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = isEmailValid(email) && password !== '';

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <form onSubmit={handleSubmit} className="display: grid">
        <input
          type="email"
          placeholder='Email'
          className='emailAndPassInput pl-3 pr-5 mb-4'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        

      
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="password-input"
            required
          />
          <div className="icon-container">
            <button
              type="button"
              onClick={handlePasswordToggle}
              style={{
                position: "absolute",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                style={{ fontSize: "20px", color: "#B0B1B2" }}
              />
            </button>
          </div>
        </div>

        <div className='text-right'>
          <h5 className='forgotPasswordText text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm mt-2'>Forgotten password?</h5>
        </div>
        <div className='text-center display: flex'>
          <ToggleSwitch />
          <h4 className='forgotPasswordText text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm mt-1 ml-2'>Remember me</h4>
        </div>

        <br />

        <br />
        <button className='createAccountButton pt-2 pb-2 pr-10 pl-10 rounded-lg'
          type="submit"
          style={{
            backgroundColor: isFormValid ? 'rgb(81,154,206)' : 'gray',
            color: 'white',
            cursor: isFormValid ? 'pointer' : 'not-allowed'
          }}
          disabled={!isFormValid}
        >
          {loading ? <div className="loading-spinner"></div> : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
