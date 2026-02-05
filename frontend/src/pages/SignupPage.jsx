import { ChevronLeft, Loader } from "lucide-react";
import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../utils/authStore";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState(false);

  const navigate = useNavigate();

  const { signup, isLoading, error } = useAuthStore();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      if (password !== confirmPassword) return setPassError(true);
      await signup(email, password, userName, name);
      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p className="text-red-500 font-bold text-center fixed top-0 left-0 right-0 ">
        {error}
      </p>
      {passError && (
        <p className="text-red-500 font-bold text-center fixed top-0 left-0 right-0 ">
          Passwords don't match
        </p>
      )}
      <div className="relative">
        <div>
          <ChevronLeft
            color="white"
            className="absolute size-9 left-4 -top-15"
          />
        </div>
      </div>

      <div className="px-5">
        <h2 className="text-white text-3xl font-bold mt-20 ">Create Account</h2>
        <p className="text-gray-400 text-md mt-3">
          Join us today and start your journey.
        </p>
      </div>

      <div>
        <form
          onSubmit={handleSignup}
          className="max-w-6xl mx-auto flex flex-col  justify-center items-center mt-8"
        >
          <div>
            <label className="text-white text-md ">Full Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="text-white text-md ">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="text-white text-md ">User Name</label>
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter a username"
            />
          </div>

          <div>
            <label className="text-white text-md ">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a new password"
            />
          </div>
          <div>
            <label className="text-white text-md ">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <div className="flex px-7 gap-5">
            <input type="checkbox" />
            <p className="text-gray-400 font-light text-md">
              I agree to the Terms & Conditions and Privacy Policy.
            </p>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className=" bg-blue-600 px-25 py-3 text-xl text-white rounded-xl mt-5 mb-10 "
            style={{ boxShadow: "0 6px 20px rgba(37,99,235, 0.4)" }}
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader className="animate-spin" />
                <span>Creating...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <p className="text-gray-400 font-light text-md text-center mb-15">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 font-bold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
