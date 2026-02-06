import { ChevronLeft, Loader, Mail, RotateCcw, UserLock } from "lucide-react";
import React, { useState } from "react";
import Input from "../components/Input";
import { useAuthStore } from "../utils/authStore";
import { Link } from "react-router";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { forgotPassword, isLoading, error } = useAuthStore();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await forgotPassword(email);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
      <div className="relative flex justify-center  mt-5">
        <div>
          <ChevronLeft color="white" className="fixed size-8 left-2 " />
        </div>
        <span className="text-white text-xl font-semibold">Verify Account</span>
      </div>
      {error && (
        <p className="text-red-500 font-bold text-center absolute top-90">
          {error}
        </p>
      )}
      <div className="px-5 mt-15">
        <h2 className="text-3xl text-white font-extrabold">Forgot Password</h2>
        <p className="text-gray-400 text-md mt-3 pr-2">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>
      </div>

      <div className="mt-12 max-w-6xl mx-auto flex justify-center">
        <div className="w-25 h-25 bg-blue-900/30 rounded-full flex justify-center items-center relative">
          <UserLock className="text-blue-700" />
          <RotateCcw className="absolute text-blue-700 size-15" />
        </div>
      </div>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="mt-10 text-white max-w-6xl mx-auto flex flex-col items-center"
        >
          <div>
            <label>Email Address</label>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className=" bg-blue-600 px-23 py-3 text-lg font-bold text-white rounded-xl mt-5 mb-10 disabled:bg-blue-600/40"
            style={{ boxShadow: "0 6px 20px rgba(37,99,235, 0.4)" }}
          >
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      ) : (
        <div className="max-w-6xl mx-auto flex justify-center mt-20 mb-25 text-white px-5 ">
          <div className="flex gap-5  items-center border border-gray-400 rounded-xl bg-gray-800 p-2">
            <div>
              <div className="flex justify-center items-center w-10 h-10 rounded-full bg-blue-900/30">
                <Mail className="text-blue-700" />
              </div>
            </div>
            <p className="text-xs">
              If there is an account associated with {email}, an email will be
              sent to your inbox shortly
            </p>
          </div>
        </div>
      )}

      <p className="text-gray-500">
        Remembered your password?
        <Link to="/login">
          <span className="text-blue-500"> Login</span>
        </Link>
      </p>
    </div>
  );
}
