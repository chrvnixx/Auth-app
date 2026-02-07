import React from "react";
import { useAuthStore } from "../utils/authStore";
import { Loader } from "lucide-react";

export default function Dashboard() {
  const { logout, isLoading } = useAuthStore();
  async function handleLogout() {
    try {
      await logout();
    } catch (error) {}
  }
  return (
    <div
      onClick={handleLogout}
      className="flex justify-center items-center mt-60 text-white"
    >
      <button className="border border-gray-500 bg-gray-700 rounded-full px-10 py-6">
        {isLoading ? <Loader className="animate-spin size-8" /> : " LOG OUT"}
      </button>
    </div>
  );
}
