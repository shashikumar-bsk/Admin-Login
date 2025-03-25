import React, { useState } from "react";
import axios from "axios";
import "../loginScreens/registration.css";
import logo from "../assets/admin-logo.png";

const ForgotPasswordScreen: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [adminId, setAdminId] = useState<string>("");

  const handleSendOtp = async () => {
    try {
      await axios.post("https://mamun-reza-freeshops-backend.vercel.app/admin/forgetPassword", { email });
      alert("OTP sent to your email!");
      setStep(2);
    } catch (error) {
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:2019/api/v1/admin/forgotVerifyotp", {
        email,
        otp,
      });
      setAdminId(response.data.adminId);
      alert("OTP verified!");
      setStep(3);
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await axios.post(`http://localhost:2019/api/v1/admin/changePassword/${adminId}`, {
        newPassword,
        confirmPassword,
      });
      alert("Password changed successfully!");
      setStep(1);
    } catch (error) {
      alert("Failed to change password");
    }
  };

  return (
    <div className="register-container">
      {/* Left Side - Branding */}
      <div className="left-section">
        <img src={logo} alt="Free Shopps Logo" className="logo" />
      </div>

      <div className="divider"></div>

      {/* Right Side - Forgot Password Form */}
      <div className="right-section">
        <div className="register-box">
          <h3>Forgot Password</h3>
          <p>Reset your password and get back in.</p>

          {step === 1 && (
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleSendOtp}>Send OTP</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <label>Enter OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={handleVerifyOtp}>Verify OTP</button>
            </div>
          )}

          {step === 3 && (
            <div>
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button onClick={handleChangePassword}>Change Password</button>
            </div>
          )}

          <p className="login-link">Remember your password? <a href="/">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
