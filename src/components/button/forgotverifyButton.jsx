"use client";
import React from "react";
import { useFormStatus } from "react-dom";
function VerifyBubmitButton({ name, type }) {
  const { pending } = useFormStatus();
  return (
    <div>
      <button
        type="submit"
        aria-disabled={pending}
        className={` mx-auto relative mt-3  flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white shadow-sm ${
          pending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#00453e] hover:bg-[#0d5e56]"
        }`}
      >
        {pending ? type : name}
      </button>
    </div>
  );
}

export default VerifyBubmitButton;
