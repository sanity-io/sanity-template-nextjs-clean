"use client";

import { useState } from "react";

export default function GetStartedCode() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      "npm create sanity@latest -- --template sanity-io/sanity-template-nextjs-clean",
    );
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <div className="inline-flex rounded-full shadow-xl md:whitespace-nowrap bg-gray-900 px-4 py-2 lg:pl-6 lg-pr:5 md:py-4 text-white text-sm lg:text-base mt-6 font-mono gap-4 items-center">
      <span>
        <span className="text-cyan-500 font-bold">npm</span>{" "}
        <span className="text-red-500 font-bold">create</span> sanity@latest --
        --template sanity-io/sanity-template-nextjs-clean
      </span>
      <button className="text-red-500 relative" onClick={handleCopy}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 md:h-6"
        >
          <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path>
        </svg>
        <span
          className={`absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-300 ${
            showTooltip ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          Copied!
        </span>
      </button>
    </div>
  );
}
