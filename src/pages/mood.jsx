import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from '../assets/naturePic.jpg';

async function submitForm(answer) {
  const response = await fetch("https://api.yourbackend.com/gratitude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer, date: new Date().toISOString() }),
  });
  if (!response.ok) throw new Error("Gagal menyimpan gratitude");
} //need to understand

const Mood = () => {  
  const [mood, setMood] = useState("");
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('typing')
  const navigate = useNavigate();

  const safetySectionRef = useRef(null);
  const renderContent = () => {
  if (mood === "calm") {
        return <div> 
          <p>Wonderful to hear. Enjoy this peaceful moment and let your mind rest.</p> 
          <button onClick={() => {safetySectionRef.current?.scrollIntoView({ behavior : "smooth"});
        }}>1 thing you grateful today</button>
        </div> 
      } else if (mood === "anxious") {
        return <div>
          <p>Take a slow, deep breath. Slow down—you don't have to figure everything out all at once</p>
          <button onClick={() => navigate("/safety")}>Let's do some exercise</button>
        </div>
      } else if (mood === "stable") {
        return <div> 
          <p>A great sense of balance. Keep your steady rhythm and move through today at your own pace</p>
          <button onClick={() => {safetySectionRef.current?.scrollIntoView({ behavior : "smooth"});
          }}>1 thing you grateful today</button>
        </div>
      } else if (mood === "low") {
        return <div>
          <p>Thank you for checking in honestly. Having a hard day is okay, and it's completely fine to just rest</p>
          <button onClick={() => navigate("/safety")}>Click to journal</button>
        </div>
      } 
    };

  const [sleepDuration, setSleepDuration] = useState(480);
  const today = new Date();

  const [summaryData, setSummaryData] = useState(null);
  useEffect(() => {
  fetch("https://api.yourbackend.com/daily-summary")
    .then((res) => {
      if (!res.ok) throw new Error("Gagal fetch");
      return res.json();
    })
    .then((data) => setSummaryData(data))
    .catch((err) => {
      console.error("Gagal mengambil data summary:", err);
      setSummaryData({ mood: "-", sleep: "-", note: "Data tidak tersedia" }); // fallback
    });
}, []); //need to understand

    
  
 async function handleSubmit() {
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }
  
  function handleTextAreaChange(e) {
    setAnswer(e.target.value);
  }

// #F2F0ED
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <h1 className="text-left text-2xl font-semibold text-gray-900 mx-6 mt-12">How are you feeling today?</h1>
      <h2 className="text-left text-base text-gray-500 mx-6">Take a moment to check in with your inner sanctuary.</h2>
      <div className="grid grid-cols-2 gap-6 w-fit mx-auto mt-6 mb-6">
        <button onClick={() => setMood("calm")} className="box-border size-36 bg-[#E4E2DE] rounded-3xl">Calm</button>
        <button onClick={() => setMood("anxious")} className="box-border size-36 bg-[#E4E2DE] rounded-3xl">Anxious</button>
        <button onClick={() => setMood("stable")} className="box-border size-36 bg-[#E4E2DE] rounded-3xl">Stable</button>
        <button onClick={() => setMood("low")} className="box-border size-36 bg-[#E4E2DE] rounded-3xl">Low</button>
      </div>
      {renderContent()}

      <div className="box border border-gray-300/40 size-78 rounded-4xl mx-auto bg-[#E4E2DE] corner">
        <div className="flex justify-between items-start px-6 pt-6">
        <div>
          <h1 className="text-left text-2xl ml-2">Sleep History</h1>
          <h3 className="text-left text-xs ml-2 mx-6">Total duration last night</h3>
        </div>
        {/* Ikon SVG Bulan & Awan (Kanan) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-2 0 26 24"
          fill="none"
          stroke="#3A5340"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-9 h-9 mt-2 shrink-0"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          <path d="M11 17a2.5 2.5 0 0 0-4-2 5 5 0 0 0-8.5 3.5 3 3 0 0 0 3 3h9.5a2.5 2.5 0 0 0 0-5Z"/>
        </svg>
      </div>
      <div className="my-12 mx-4">
      <input 
      type="range" 
      id="sleepDuration" 
      name="sleepDuration" 
      min="0" 
      max="720" 
      step="1" 
      onChange={(e) => setSleepDuration(Number(e.target.value) || 0)} value={sleepDuration} 
      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4F6F52]" />
      <div className="flex gap-4 max-w-xs mx-auto">
            {/* Kolom Hours */}
      <div className="flex-1">
            <span className="block text-sm font-medium mt-6 ml-2 text-gray-800 mb-2">Hours</span>
            <div className="bg-white py-4 px-6 rounded-2xl text-center text-xl font-bold  border-gray-100">
              {Math.floor(sleepDuration / 60)}
            </div>
          </div>

          {/* Kolom Minutes */}
          <div className="flex-1">
            <span className="block text-sm font-medium mt-6 ml-2 text-gray-800 mb-2">Minutes</span>
            <div className="bg-white py-4 px-6 rounded-2xl text-center text-xl font-bold text-gray-800 shadow-sm border border-gray-100">
              {sleepDuration % 60}
            </div>
          </div>
          </div>
        </div>
      </div>

      <div className="box w-78 h-86 rounded-3xl border-gray-300 mx-auto bg-[#E4E2DE] corner mt-8 overflow-hidden pb-6">
        <div className="flex justify-between items-center px-8 pt-6">
          <div>
            <h1 className="text-2xl font-medium text-gray-700">Daily Summary</h1>
            <h3 className="text-sm text-gray-500 mt-1">
              {today.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            <h4 className="font-semibold mt-4 text-gray-700">Today's notes</h4>
          </div>
          {/*kalendar logo : terakhir sampe sini belum atur*/}
          <div className="bg-white flex justify-between p-2 border border-gray-300 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          </div>
        </div>

        {/* Gratitude Area */}
        <div ref={safetySectionRef} className="space-y-4">
          <div className="">
            {status === 'success' ? (
              <p className="text-[14px] font-semibold text-[#4a654e] text-center py-6">
                Very well, gratitude saved!
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Kotak Input Textarea */}
                <textarea
                  value={answer}
                  onChange={handleTextAreaChange}
                  disabled={status === 'submitting'}
                  placeholder="How was your day? Write anything that comes to mind..."
                  className=" mt-4 mx-6 bg-white/40 border border-white/60 rounded-2xl p-4 resize-none outline-none text-[16px] text-[#1b1c1a] placeholder:text-[#424842]/50 min-h-28 focus:bg-white/60  transition-all disabled:opacity-50"
                />

                {/* Tombol Simpan */}
                <button
                  onClick={handleSubmit}
                  disabled={answer.length === 0 || status === 'submitting'}
                  className="mx-6 m py-4 mb-4 rounded-full bg-[#4a654e] text-white text-[14px] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#4a654e]/20 active:scale-[0.98] transition-all disabled:opacity-40"
                >
                  <span>{status === 'submitting' ? 'Saving...' : 'Save Entry'}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>

                {/* Pesan Error */}
                {error !== null && (
                  <p className="text-[12px] text-red-500 text-center">{error.message}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center py-8">
        <div 
          className="relative w-78 h-52 rounded-[2.5rem] overflow-hidden bg-cover bg-center flex items-center justify-center p-6 shadow-md"
          style={{ backgroundImage: `url('/path-ke-gambar-kamu.jpg')` }}
        >
          <img 
          src={bgImage} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover" 
        />

          <div className="absolute inset-0 bg-black/15" />
        
          <p className="absolute inset-x-0 bottom-0.5 z-10 py-8 text-center mx-4 font-semibold text-white italic leading-snug drop-shadow-sm ">
            "You are so much more than this illness. I believe in you."
          </p>
          </div>
        </div>
    </div>
  );
};


export default Mood;