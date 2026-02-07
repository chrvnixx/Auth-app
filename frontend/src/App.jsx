import { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { useAuthStore } from "./utils/authStore";
import { PuffLoader } from "react-spinners";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  const { checkAuth, user, isAuthenticated, isCheckingAuth } = useAuthStore();

  function RedirectAuthenticatedUser({ children }) {
    if (isAuthenticated && user.isVerified) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  }

  function ProtectedRoutes({ children }) {
    if (!isAuthenticated || !user.isVerified) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth)
    return (
      <div className=" absolute min-h-screen w-full bg-neutral-900 overflow-y-auto">
        <div className="max-w-6xl mx-auto h-screen flex justify-center items-center">
          <PuffLoader color="white" size={100} />
        </div>
        <div className="fixed inset-0 bg-blue-700 bg-size[20px_20px] opacity-20 blur-[100px] pointer-events-none"></div>
      </div>
    );
  return (
    <div className=" absolute min-h-screen w-full bg-neutral-900 overflow-y-auto">
      <div className="fixed inset-0 bg-blue-700 bg-size[20px_20px] opacity-20 blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignupPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
