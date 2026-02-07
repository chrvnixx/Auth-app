import { ChevronLeft, Loader } from "lucide-react";
import React, { useState } from "react";
import Input from "../components/Input";
import { useAuthStore } from "../utils/authStore";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetPassword, isLoading, error } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  async function handleUpdate(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords don't match");
    }
    try {
      await resetPassword(token, password);
      navigate("/login");
      toast.success("Update success");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-5 flex flex-col items-center text-white ">
      <div className="relative flex justify-center  mt-5">
        <div>
          <ChevronLeft color="white" className="fixed size-8 left-2 " />
        </div>
        <span className="text-white text-xl font-semibold">Reset Password</span>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-extrabold">Create New Password</h2>
        <p className="text-gray-400 mt-3">
          Your new password must be different from previous passwords for
          security.
        </p>
      </div>

      {error && (
        <p className="text-red-500 font-bold text-center absolute mt-50">
          {error}
        </p>
      )}

      <form
        onSubmit={handleUpdate}
        className=" flex flex-col mt-15 items-center"
      >
        <div>
          <label>New Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label>Confirm new Password</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat new password"
            required
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className=" bg-blue-600 px-23 py-3 text-lg font-bold text-white rounded-xl mt-15 mb-10 disabled:bg-blue-600/40"
          style={{ boxShadow: "0 6px 20px rgba(37,99,235, 0.4)" }}
        >
          {isLoading ? <Loader className="animate-spin" /> : "Update Password"}
        </button>
      </form>
    </div>
  );
}
