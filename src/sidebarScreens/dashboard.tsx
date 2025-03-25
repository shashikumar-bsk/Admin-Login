import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import "../sidebarScreens/dashboard.css";
import CategoryManagement from "./CategoryManagement";
const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
        <CategoryManagement />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
