import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./loginScreens/login"));
const ForgotPasswordScreen = lazy(() => import("./loginScreens/forgotPassword"));
const RegisterScreen = lazy(() => import("./loginScreens/registration"));
const WelcomeScreen = lazy(() => import("./loginScreens/welcomeScreen"));
const Dashboard = lazy(() => import("./sidebarScreens/dashboard"));
const ProfileUpdate = lazy(() => import("./loginScreens/updateProfile"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile-update" element={<ProfileUpdate />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
