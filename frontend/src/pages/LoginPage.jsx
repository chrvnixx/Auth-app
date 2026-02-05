import { ChevronLeft, Unlock } from "lucide-react";
import React, { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router";

export default function LoginPage() {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="relative flex justify-center  mt-3">
        <div>
          <ChevronLeft color="white" className="fixed size-8 left-2 " />
        </div>
        <span className="text-white text-xl font-semibold">Sign In</span>
      </div>

      <div className="max-w-6xl mx-auto flex justify-center mt-10">
        <div
          className="w-18 h-18 flex justify-center items-center bg-[#135bec] rounded-2xl "
          style={{ boxShadow: "0 6px 20px rgba(135, 206, 235, 0.4)" }}
        >
          <Unlock color="white" className="size-9" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col justify-center items-center px-5">
        <h2 className="text-3xl font-extrabold text-white mt-10">
          Welcome Back
        </h2>
        <p className="text-lg text-gray-400 text-center">
          Enter your credentials to access your account.
        </p>
      </div>

      <form className="text-white max-w-6xl mx-auto flex flex-col justify-center items-center px-5 mt-5">
        <div>
          <label>Email or Username</label>
          <Input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Enter your email or username"
          />
        </div>
        <div>
          <label>Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <div className="relative max-w-6xl mx-auto ">
          <Link
            to="/forgot-password"
            className="absolute right-0 left-8 text-blue-600 whitespace-nowrap font-semibold"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className=" bg-blue-600 px-30 py-3 text-xl text-white rounded-xl mt-15 mb-10 disabled:bg-blue-600/50"
          style={{ boxShadow: "0 6px 20px rgba(37,99,235, 0.4)" }}
        >
          Log in
        </button>
      </form>
      <div className="max-w-6xl mx-auto flex justify-center text-sm mb-10">
        <p className="text-gray-400">
          Don't have an account?
          <Link to="/signup">
            <span className="text-blue-600 font-semibold"> Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
