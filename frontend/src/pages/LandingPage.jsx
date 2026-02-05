import React from "react";
import { Rocket } from "lucide-react";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-6xl mx-auto flex justify-center mt-20">
          <div
            className="w-20 h-20 flex justify-center items-center bg-[#135bec] rounded-2xl "
            style={{ boxShadow: "0 6px 20px rgba(135, 206, 235, 0.4)" }}
          >
            <Rocket color="white" className="size-12" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col justify-center items-center mt-10 p-5">
          <h1 className="text-4xl font-bold text-blue-600">
            <span className="text-white">Welcome to</span> <br />{" "}
            <em className="text-5xl">Authenticity</em>
          </h1>

          <p className="text-center text-gray-400 text-lg mt-5">
            Securing your daily workflow with proper and intelligent
            authentication system
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex justify-center items-center mt-5">
          <div className="h-70 w-70 bg-blue-900/10 rounded-full flex justify-center items-center">
            <div className="w-50 h-30 bg-amber-200 rounded-lg flex justify-center items-center overflow-hidden ">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyPQsBmDHkU2nIdfcxSzA_wI6GKiGu4F_8bj1_dP9ZtkS6G1zjv6UOOW2MxKuy46XgH7svlXdc0bIzpePeDU1RG6hPHbXadzHB_pDmtTWmHMGASL_Az2GsOiLsymp7G5Weo6nKsyO3mrXoyo09YaKOK1go5YjdPMniSy3jpEEQ8o-_6VS8Ere1wNbKpDlqndrjp6vmFIqPe4ZYeicSpeKs9a7ljn2YueLaYpLvTtWN-y8Rz63s_z3Nm1s8Jzca7vRilcblNwHRd7Mr"
                alt=""
              />
            </div>
          </div>
        </div>
        <div>
          <div className=" max-w-xl mx-auto flex flex-col items-center mt-5 mb-10">
            <Link to="/signup">
              <button
                className=" bg-blue-600 px-30 py-3 text-xl text-white rounded-xl "
                style={{ boxShadow: "0 6px 20px rgba(37,99,235, 0.4)" }}
              >
                Get Started
              </button>
            </Link>

            <Link to="/login">
              <button className=" bg-gray-700 px-36 py-3 text-xl text-white rounded-xl mt-5">
                Log In
              </button>
            </Link>
          </div>
        </div>
        <p className="text-center text-gray-500 font-light text-sm mb-10 ">
          By continuing, you agree to our{" "}
          <span className="underline">Terms of Service</span> and{" "}
          <span className="underline">Privacy Policy</span>
        </p>
      </div>
    </>
  );
}
