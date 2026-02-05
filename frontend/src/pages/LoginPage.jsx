import { ChevronLeft } from "lucide-react";
import React from "react";

export default function LoginPage() {
  return (
    <div>
      <div>
        <div className="relative flex justify-center  mt-3">
          <div>
            <ChevronLeft color="white" className="fixed size-8 left-2 " />
          </div>
          <span className="text-white text-xl font-semibold">Sign In</span>
        </div>
      </div>
    </div>
  );
}
