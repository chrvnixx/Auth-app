import React from "react";

export default function Input({ ...props }) {
  return (
    <div>
      <input
        {...props}
        className="border border-gray-600 bg-gray-800 w-xs h-12 rounded-lg mt-2 pl-3 text-gray-300 mb-5"
      />
    </div>
  );
}
