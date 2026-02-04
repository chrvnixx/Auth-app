import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className=" absolute min-h-screen w-full bg-neutral-900 overflow-y-auto">
      <div className="fixed inset-0 bg-blue-700 bg-size[20px_20px] opacity-20 blur-[100px] pointer-events-none"></div>
      <div className="relative z-10 w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
