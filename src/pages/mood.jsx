import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Mood = () => {
  const [mood, setMood] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/mood");
  }

  const [sleepDuration, setSleepDuration] = useState(0);
  const today = new Date();

  const [summaryData, setSummaryData] = useState(null);
  useEffect(() => {
    fetch("https://api.example.com/daily-summary")
    .then((res) => res.json())
    .then((data) => setSummaryData(data));
  }, []);

  return (
    <div className="bg-[#F2F0ED] min-h-screen">
      <h1 className="text-left text-2xl font-semibold text-gray-900 mx-6 mt-12">How are you feeling today?</h1>
      <h2 className="text-left text-base text-gray-500 mx-6">Take a moment to check in with your inner sanctuary.</h2>
      <div className="grid grid-cols-2 gap-6 w-fit mx-auto mt-6 mb-6">
        <button onClick={() => setMood("calm")} className="box-border size-36 bg-[#E4E2DE] rounded-3xl">Calm</button>
        <button onClick={() => setMood("anxious")} className="box-border size-36 bg-[#E4E2DE] rounded-3xl">Anxious</button>
        <button onClick={() => setMood("stable")} className="box-border size-36 bg-[#E4E2DE] rounded-3xl">Stable</button>
        <button onClick={() => setMood("low")} className="box-border size-36 bg-[#E4E2DE] rounded-3xl">Low</button>
      </div>
      {mood && (
        <p>You selected: {mood}</p>
      )}

      <div className="box border border-gray-300 size-78 rounded-3xl mx-auto bg-[#E4E2DE] corner">
      <h1 className="text-center text-2xl mx-6 mt-4">Sleep History</h1>
      <h3 className="text-center text-xs mt-1 text-gray-500 mx-6">Total duration last night</h3>
      <div className="my-12 mx-4">
      <input 
      type="range" 
      id="sleepDuration" 
      name="sleepDuration" 
      min="0" 
      max="720" 
      step="1" 
      onChange={(e) => setSleepDuration(parseInt(e.target.value))} value={sleepDuration} 
      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4F6F52]" />
      <div className="flex gap-4 max-w-xs mx-auto">
            {/* Kolom Hours */}
      <div className="flex-1">
            <span className="block text-sm font-medium mt-6 text-gray-800 mb-2">Hours</span>
            <div className="bg-white py-4 px-6 rounded-2xl text-center text-xl font-bold text-gray-800 shadow-sm border border-gray-100">
              {Math.floor(sleepDuration / 60)}
            </div>
          </div>

          {/* Kolom Minutes */}
          <div className="flex-1">
            <span className="block text-sm font-medium mt-6 text-gray-800 mb-2">Minutes</span>
            <div className="bg-white py-4 px-6 rounded-2xl text-center text-xl font-bold text-gray-800 shadow-sm border border-gray-100">
              {sleepDuration % 60}
            </div>
          </div>
          </div>
        </div>
      </div>

      <div className="box size-78 rounded-3xl border-gray-300 mx-auto bg-[#E4E2DE] corner mt-8">
        <div className="flex justify-between items-center px-8 pt-6">
          <div>
            <h1 className="text-2xl font-medium text-gray-700">Daily Summary</h1>
            <h3 className="text-sm text-gray-500 mt-1">
              {today.toLocaleDateString({
                weekday: 'numeric',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
          </div>
          {/*kalendar logo : terakhir sampe sini belum atur*/}
          <div className="bg-white flex justify-between p-2 border border-gray-300 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          </div>
        </div>
        
        {/* AREA INSIGHTS (Diberi margin agar sejajar dengan teks di atasnya) */}
        <div className="px-8 mt-6">
          {summaryData ? (
            <p className="text-gray-700 text-sm leading-relaxed">{summaryData.insights}</p>
          ) : (
            <p className="text-gray-500 text-sm italic">Loading insights...</p>
          )}
        </div>
      </div>

      </div>
  );
};

export default Mood;