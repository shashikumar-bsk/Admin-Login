import React from "react";
import { useNavigate } from "react-router-dom";
import "../loginScreens/welcomeScreen.css";
import logo from "../assets/admin-logo.png"; // Replace with the correct path

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <img src={logo} alt="Free Shops Logo" className="welcome-logo" />

        <h1 className="welcome-title">Welcome</h1>
        <h2 className="welcome-subtitle">
          <span className="highlight">to the Free Shops App Admin Panel</span>
        </h2>

        <p className="welcome-description">
          Manage and monitor all aspects of your app seamlessly from one place.
          Use the tools below to get started.
        </p>

        <button className="welcome-button" onClick={() => navigate("/dashboard")}>
          Get Start
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
