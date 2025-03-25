import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../loginScreens/profileUpdate.css";
import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";
import axios from "axios";

const ProfileUpdate: React.FC = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found");
        return;
      }
  
      try {
        const response = await axios.get(
          "https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/getProfile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Profile data fetched:", response.data); // Debugging line
        setProfileData({
          fullName: response.data.fullName || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          password: "", // Never pre-fill passwords
        });
      } catch (error: any) {
        console.error("Error fetching profile:", error.response?.data || error.message);
      }
    };
  
    fetchProfile();
  }, []);
  
  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Handle form submission (update profile)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axios.put("https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/update", profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-blur">
        <div className="profile-card">
          <button className="skip-button" onClick={() => navigate("/dashboard")}>
            Skip
          </button>
          <div className="profile-header">
            <label htmlFor="profile-pic" className="profile-pic-label">
              {image ? (
                <img src={image} alt="Profile" className="profile-pic" />
              ) : (
                <div className="profile-placeholder">
                  <FaCamera size={40} color="#999" />
                </div>
              )}
            </label>
            <input type="file" id="profile-pic" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
            <p className="upload-text">Upload Profile Picture</p>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <label>Your Name</label>
            <input type="text" name="fullName" value={profileData.fullName} onChange={handleChange} placeholder="Enter your name" />

            <label>Email</label>
            <input type="email" name="email" value={profileData.email} onChange={handleChange} placeholder="Enter your email" />

            <label>Phone Number</label>
            <input type="tel" name="phone" value={profileData.phone} onChange={handleChange} placeholder="Enter your phone number" />

            <label>Password</label>
            <div className="password-field">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={profileData.password}
                onChange={handleChange}
                placeholder="Enter new password"
              />
              <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="save-button">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
