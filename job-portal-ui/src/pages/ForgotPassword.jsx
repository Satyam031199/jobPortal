import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth } from '../config/FirebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if(!email){
      toast.error('Email is required')
      return
    }
    try {
      await sendPasswordResetEmail(auth,email);
      toast.success('Password reset email sent. Check your inbox')
      navigate('/login')
    } catch (error) {
      toast.error(`${error.message}`)
    }
  }
  return (
    <div className="flex justify-center items-center top-container">
      <div className="form-container">
        <div className="logo-container">Forgot Password</div>

        <form className="form">
          <div className="form-group">
            <label htmlFor="email" className="text-lg">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              required=""
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="form-submit-btn font-semibold" type="submit" onClick={handleResetPassword}>
            Send Email
          </button>
        </form>

        <p className="signup-link">
          Don&apos;t have an account?
          <Link to="/signup" className="signup-link link">
            {" "}
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
