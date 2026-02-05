import { ChevronLeft, Loader } from "lucide-react";
import React, { useRef, useState } from "react";
import { useAuthStore } from "../utils/authStore";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function EmailVerificationPage() {
  const [code, setCode] = useState(new Array(6).fill(""));

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  function handleChange(index, value) {
    const newCode = [...code];

    if (!/^\d*$/.test(value)) return false;

    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  }

  function handlePaste(e) {
    const newCode = [...code];

    const pastedCode = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    if (pastedCode.length === 0) return false;

    pastedCode.forEach((digit, index) => {
      newCode[index] = digit;
    });
    setCode(newCode);

    const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
    const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
    inputRefs.current[focusIndex].focus();
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const { verifyEmail, isLoading, error } = useAuthStore();

  async function handleVerify(e) {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/dashboard");
      toast.success("Verification success");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="relative flex justify-center  mt-3">
        <div>
          <ChevronLeft color="white" className="fixed size-8 left-2 " />
        </div>
        <span className="text-white text-xl font-semibold">Verify Account</span>
      </div>

      <div className="mt-15">
        <h2 className="text-white text-center text-3xl font-bold">
          Verify Your Account
        </h2>

        <p className="text-gray-400 text-center mt-5">
          Enter the 6-digit code sent to
        </p>
        <span></span>
      </div>
      <form onSubmit={handleVerify}>
        <div className="flex gap-3 max-w-6xl mx-auto justify-center mt-20">
          {code.map((digit, index) => (
            <input
              type="text"
              key={index}
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength="1"
              onChange={(e) => handleChange(index, e.target.value)}
              onPaste={handlePaste}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="border w-12 h-16 rounded-xl border-b-2 border-gray-600 text-center text-xl text-gray-400"
              placeholder="-"
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto flex flex-col items-center mt-15">
          <p className="text-gray-400">Didn't receive the code?</p>
          <button className="text-blue-500 mt-5">Resend Code</button>
        </div>
        <div className="mt-5">
          {error && (
            <p className="text-center text-red-500 font-bold ">{error}</p>
          )}
        </div>

        <div className="max-w-6xl mx-auto flex flex-col items-center mt-10">
          <button
            disabled={isLoading}
            type="submit"
            className=" bg-blue-600 px-30 py-3 text-xl text-white rounded-xl mt-5 mb-10 disabled:bg-blue-600/50"
            style={{ boxShadow: "0 6px 20px rgba(37,99,235, 0.4)" }}
          >
            {isLoading ? <Loader className="animate-spin" /> : "verify"}
          </button>
        </div>
      </form>
    </div>
  );
}
