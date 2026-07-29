import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
  return (
    <div className="box-border w-full h-20 bg-[#F5F5F5] sticky bottom-0 flex items-center justify-center">
      <button className="box-border rounded-full px-6 bg-[#F5F5F5] hover:bg-gray-200 transition-colors duration-200 mx-2 flex flex-col items-center justify-center py-2"
      onClick={() => navigate("/mood")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="w-8 h-8 text-gray-600"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          />
          <circle cx="9" cy="10" r="1.25" fill="currentColor" />
          <circle cx="15" cy="10" r="1.25" fill="currentColor" />

          <path
            d="M8 13.5 C8 16.2 9.8 18 12 18 C14.2 18 16 16.2 16 13.5 Z"
            fill="currentColor"
          />
        </svg>
        <span className="text-sm font-medium text-gray-600">Tracker</span>
      </button>
      <button className="box-border rounded-full px-6 bg-[#F5F5F5] hover:bg-gray-200 transition-colors duration-200 mx-2 flex flex-col items-center justify-center py-2"
        onClick={() => navigate("/medications")}
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-gray-600"
        >
          <g transform="rotate(-45 12 12)">
            <rect x="7" y="3" width="10" height="18" rx="5" />
            <line x1="7" y1="12" x2="17" y2="12" />
          </g>
        </svg>
        <span className="text-sm font-medium text-gray-600">Meds</span>
      </button>
      <button className="box-border rounded-full px-6 bg-[#F5F5F5] hover:bg-gray-200 transition-colors duration-200 mx-2 flex flex-col items-center justify-center py-2"
        onClick={() => navigate("/journal")}
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-gray-600"
        >
          <rect x="3" y="4" width="11" height="2.5" rx="0.5" />
          <rect x="3" y="9.5" width="11" height="2.5" rx="0.5" />
          <rect x="3" y="15" width="8" height="2.5" rx="0.5" />

          <g transform="rotate(-45 16 16)">
            <rect x="13.5" y="10" width="5" height="10" rx="2.5" />
            <line
              x1="16"
              y1="12"
              x2="16"
              y2="16"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        </svg>
        <span className="text-sm font-medium text-gray-600">Journal</span>
      </button>
      <button className="box-border rounded-full px-6 bg-[#F5F5F5] hover:bg-gray-200 transition-colors duration-200 mx-2 flex flex-col items-center justify-center py-2"
        onClick={() => navigate("/safety")}
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-gray-600"
        >
          <path d="M7 4.5a8 8 0 0 1 10 0" />

          <path d="M9.2 7.0a5 5 0 0 1 5.6 0" />

          <path d="M12 21.5s-4.5-4.2-4.5-7.5a4.5 4.5 0 0 1 9 0c0 3.3-4.5 7.5-4.5 7.5z" />

          <circle cx="12" cy="14" r="0.8" fill="currentColor" stroke="none" />
        </svg>
        <span className="text-sm font-medium text-gray-600">Safety</span>
      </button>
    </div>
  );
}

export default Footer;
