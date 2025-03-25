import React, { useState } from "react";
import axios from "axios";
import "../loginScreens/registration.css";
import logo from "../assets/admin-logo.png";

const RegisterScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/registration", formData);
      alert("Registration successful");
      console.log(response.data);
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="left-section">
        <img src={logo} alt="Free Shopps Logo" className="logo" />
      </div>
      <div className="divider"></div>
      <div className="right-section">
        <div className="register-box">
          <h3>Create New Account</h3>
          <p>Welcome to Free Shopps App Controller</p>

          <form onSubmit={handleSubmit}>
            <label>Your Name</label>
            <input type="text" name="fullName" placeholder="Enter your name" onChange={handleChange} />

            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} />

            <label>Phone Number</label>
            <input type="tel" name="phone" placeholder="Enter your phone number" onChange={handleChange} />

            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>👁️</span>
            </div>

            <label>Confirm Password</label>
            <div className="password-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>👁️</span>
            </div>

            <button className="register-button" type="submit">Create Account</button>
            <p className="login-link">Already have an account? <a href="/">Login</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
