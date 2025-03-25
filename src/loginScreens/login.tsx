import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../loginScreens/login.css";
import logo from "../assets/admin-logo.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/login",
        { email, password }
      );

      const token = response.data.accessToken;

      if (token) {
        localStorage.setItem("authToken", token); // ✅ Store token in localStorage
        navigate("/welcome"); // ✅ Navigate to Welcome Screen
      } else {
        setError("Login failed. No token received."); // ❌ Show error instead of navigating to register
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Left Section with Logo */}
      <div className="left-section">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Right Section with Login Form */}
      <div className="right-section">
        <div className="login-box">
          <h3>Log in</h3>
          <p>Welcome to Free Shops App Controller</p>

          <label>User Name</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // ✅ Fix: Store email input
          />

          <label>Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)} // ✅ Fix: Store password input
            />
            <span
              className="toggle-password"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              👁
            </span>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>} {/* ✅ Show error message */}

          <p className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          <button className="login-button" onClick={handleLogin}>Log in</button>

          <p className="create-account">
            <Link to="/register">Create New Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
