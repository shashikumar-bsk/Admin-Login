import React, { useEffect, useState } from "react";
import { Search as SearchIcon, Notifications as NotificationsIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/header.css";
import profile from "../assets/profile.webp";

const Header: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string>(profile);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get("https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/getProfile");
        if (response.data?.image) {
          setProfileImage(response.data.image);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <div className="header">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button className="search-btn">
          <SearchIcon className="search-icon" />
        </button>
      </div>
      <div className="header-icons">
        <NotificationsIcon className="bell-icon" /> {/* Material UI bell icon */}
        <img 
          src={profileImage} 
          alt="Profile" 
          className="profile-img" 
          onClick={() => navigate("/profile-update")} 
          style={{ cursor: "pointer" }} 
        />
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default Header;
