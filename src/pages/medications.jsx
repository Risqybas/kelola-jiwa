import { useState, useEffect } from "react";
import bgImage from "../assets/calmPic.jpg";

export function Medications() {
  return (
    <div className="page-transition relative bg-[#F5F5F5] min-h-screen">
      <h1 className="text-left text-3xl font-semibold text-gray-900 mx-6 pt-6">
        Medications
      </h1>
      <h2 className="text-left text-base text-gray-500 mx-6">
        Maintaining your rhythm with gentle reminders and mindful tracking.
      </h2>
      <div className=" flex justify-center">
        <button className="box-border w-90 h-12 bg-[#4a654e] rounded-4xl my-6 font-medium text-white">
          + Add Medications
        </button>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          fill="none"
          stroke="#3A5340"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          preserveAspectRatio="xMidYMid meet"
          className="w-18 h-18 rounded-full bg-[#7B987F]/10 mt-8 mx-auto"
        >
          {isTablet ? (
            <>
            <tabletIcon/>
              <circle cx="50" cy="50" r="35" />
              <path d="M 22 50 L 78 50" />
            </>
          ) : (
            <>
            <kapsulIcon/>
              <path d="M35 65 L65 35" />
              <path d="M28 58 C20 50 20 38 28 30 C36 22 48 22 56 30 L70 44 C78 52 78 64 70 72 C62 80 50 80 42 72 L28 58 Z" />
            </>
          )}
        </svg>
      </div>
      <div className="flex justify-center">
        <div className="box-border h-50 w-90 bg-white rounded-4xl my-4 border border-gray-300"></div>
      </div>

      {/* gentle reminder */}
      <div className="flex justify-center my-4">
        <div className="box-border border-2 border-dashed border-[#4a654e]/40 w-90 h-52 bg-[#DAF9DB]/30 rounded-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
            stroke="#3A5340"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            preserveAspectRatio="xMidYMid meet"
            className="w-18 h-18 rounded-full bg-[#7B987F]/1 mt-8 mx-auto"
          >
            <path d="M 50 18 C 41 32, 41 48, 50 62 C 59 48, 59 32, 50 18 Z" />
            <path d="M 28 44 C 28 72, 40 80, 50 80 C 60 80, 72 72, 72 44" />
            <path d="M 28 44 C 36 46, 44 54, 50 62" />
            <path d="M 72 44 C 64 46, 56 54, 50 62" />
            <path d="M 50 62 L 50 80" />
          </svg>
          <p className="text-xl text-center">Gentle Reminder</p>
          <p className="text-sm italic text-center mx-4">
            Consistent tracking helps you and your provider identity patterns
            for better care.
          </p>
        </div>
      </div>
      {/* pic with quotes */}
      <div className="flex justify-center items-center py-4">
        <div
          className="relative w-90 h-52 rounded-[2.5rem] overflow-hidden bg-cover bg-center flex items-center justify-center p-6 shadow-md"
          //   style={{ backgroundImage: `url('/path-ke-gambar-kamu.jpg')` }}
        >
          <img
            src={bgImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/15" />

          <p className="absolute inset-x-0 bottom-0.5 z-10 py-8 text-center mx-4 font-semibold text-white italic leading-snug drop-shadow-sm ">
            "Small steps led to great changes."
          </p>
        </div>
      </div>
    </div>
  );
}

export default Medications;
