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
    <div>
      <h1>How are you feeling today?</h1>
      <h2>Take a moment to check in with your inner sanctuary</h2>
      <div>
        <button onClick={() => setMood("calm")}>Calm</button>
        <button onClick={() => setMood("anxious")}>Anxious</button>
        <button onClick={() => setMood("stable")}>Stable</button>
        <button onClick={() => setMood("low")}>Low</button>
      </div>
      {mood && (
        <p>You selected: {mood}</p>
      )}

      <h1>Sleep History</h1>
      <h3>Total duration last night</h3>
      <div className="my-8">
      <input 
      type="range" 
      id="sleepDuration" 
      name="sleepDuration" 
      min="0" 
      max="720" 
      step="1" 
      onChange={(e) => setSleepDuration(parseInt(e.target.value))} value={sleepDuration} 
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4F6F52]" /> //contoh
      <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>0h</span>
            <span>12h</span>
          </div>
        </div>
      <p>
        {Math.floor(sleepDuration / 60)} hours {sleepDuration % 60} minutes
      </p>

      <h1>Daily Summary</h1>
      <h3>{today.toLocaleDateString({
        weekday: 'numeric',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}</h3>
      <div className="">
        <p>
          {summaryData ? (
          <p>{summaryData.insights}</p>
          ) : (
          <p>Loading insights...</p>
        )}
        </p>
      </div>

      </div>
  );
};

export default Mood;