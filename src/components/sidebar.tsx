import React from "react";
import "../components/sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">Logo</h2>
      <ul className="sidebar-menu">
        <li className="sidebar-item active">Dashboard</li>
        <li className="divider"></li>
        <li className="sidebar-item">User Management</li>
        <li className="divider"></li>
        <li className="sidebar-item">Rating and Review</li>
        <li className="divider"></li>
        <li className="sidebar-item">Settings</li>
        <li className="divider"></li>
        <li className="sidebar-item">History</li>
        <li className="divider"></li>
        <li className="sidebar-item">All Bookings</li>
        <li className="divider"></li>
        <li className="sidebar-item">Push Notification</li>
        <li className="divider"></li>
        <li className="sidebar-item">Transaction List</li>
        <li className="divider"></li>
        <li className="sidebar-item">Google Analytics</li>
        <li className="divider"></li>
        <li className="sidebar-item">Multi-Currency</li>
        <li className="divider"></li>
        <li className="sidebar-item">Category</li>
        <li className="divider"></li>
        <li className="sidebar-item">Live Chat History</li>
        <li className="divider"></li>
        <li className="sidebar-item">Package Plan</li>
        <li className="divider"></li>
        <li className="sidebar-item">Referral History</li>
      </ul>
    </div>
  );
};

export default Sidebar;
