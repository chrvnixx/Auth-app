import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import EmailVerificationPage from "./pages/EmailVerificationPage";

function App() {
  return (
    <div className=" absolute min-h-screen w-full bg-neutral-900 overflow-y-auto">
      <div className="fixed inset-0 bg-blue-700 bg-size[20px_20px] opacity-20 blur-[100px] pointer-events-none"></div>
      <div className="relative z-10 w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
