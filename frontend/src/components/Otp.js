
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OtpComponent = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); 
  const inputRefs = useRef([]);
  const [error, setError] = useState('');
  const [resendActive, setResendActive] = useState(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('signupToken');

  // Handle OTP input change
  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];

    if (value.length > 1) {
      newOtp[index] = value.slice(0, 1); 
    } else {
      newOtp[index] = value;
    }
    setOtp(newOtp);


    if (index < otp.length - 1 && value !== "") {
      inputRefs.current[index + 1].focus();
    }

 
    if (value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle OTP submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const enteredOtp = otp.join(""); 
      const response = await axios.post("http://localhost:5000/api/users/verifyOtp", { otp: enteredOtp, token });
    
      if (response.data.message === "OTP verified") {
        sessionStorage.removeItem('signupToken'); 
        navigate("/"); 
      } else {
  
      
      
        if (response.data.message === "OTP has expired") {
        
          setResendActive(true);
        } else {
          setError(response.data.message); 
        }
      }
    } catch (error) {
      setError("An error occurred while verifying OTP.");
    }
  };

  // Handle OTP resend
  const handleResend = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/resendOtp", { token });
      setOtp(['', '', '', '', '', '']);
      setError(""); 
      setResendActive(false); 

      // Set focus back to the first OTP input box
      inputRefs.current[0].focus();
    } catch (error) {
      setError("Error resending OTP.");
    }
  };

  return (
    <Wrapper>
      <div className="otp-container">
        <form onSubmit={handleSubmit}>
          <h3>Verify OTP</h3>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit} 
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                className="otp-box"
                autoFocus={index === 0} // Automatically focus the first box
              />
            ))}
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={resendActive}>Submit</button>
          {resendActive && <button type="button" className="btn btn-secondary" onClick={handleResend}>Resend OTP</button>}
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .otp-container {
    max-width: 400px;
    margin: 10rem auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  h3 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 30px;
    margin-bottom:3rem;
  }

  .otp-inputs {
    display: flex;
    justify-content: space-between;
  }

  .otp-box {
    width: 40px;
    height: 40px;
    padding: 1.5rem 1rem;
    font-size: 20px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    // margin-right: 5px;
    color: #333; /* Text color */
    background-color: #fff; /* Background color */
  }

  .otp-box:focus {
    border-color: #007bff;
    outline: none;
  }

  .error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
  }

  .actions {
    margin-top: 20px;
  }

  button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  button[disabled] {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default OtpComponent;
