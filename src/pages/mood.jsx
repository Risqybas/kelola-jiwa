import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/naturePic.jpg";

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
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");
  const navigate = useNavigate();
  const [sleepHours, setSleepHours] = useState(8);
  const [sleepMinutes, setSleepMinutes] = useState(0);


  const gratitudeSentenceRef = useRef(null);
  const safetySectionRef = useRef(null);
  useEffect(() => {
  if (mood === "calm") {
    gratitudeSentenceRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  } else if (mood === "anxious") {
    gratitudeSentenceRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
  } else if (mood === "stable") {
    gratitudeSentenceRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
  } else {
    gratitudeSentenceRef.current?.scrollIntoView({ behavior: "smooth", block: "center"});
  }
  }, [mood]);

  const renderContent = () => {    
    if (mood === "calm") {
      return (
        <div> 
          <p ref={gratitudeSentenceRef} className="text-center italic px-4">
            "Wonderful to hear. Enjoy this peaceful moment and let your mind
            rest."
          </p>
          <p className="text-xs italic text-center my-2">What is one thing that felt good today?</p>
          <button
            onClick={() => {
              safetySectionRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          className="flex flex-col box-border text-white font-semibold bg-[#4a654e] rounded-2xl items-center justify-center text-center w-auto h-auto px-4 py-2 mt-2 mb-6 mx-auto"
          >
            Express your feeling
          </button>
        </div>
      );
    
    } else if (mood === "anxious") {
      return (
        <div>
          <p ref={gratitudeSentenceRef} className="text-center italic px-4">
            "Take a slow, deep breath. Slow down—you don't have to figure
            everything out all at once"
          </p>
          <p></p>
          <button onClick={() => navigate("/safety")}
            className="flex flex-col box-border text-white font-semibold bg-[#B22222] rounded-2xl items-center justify-center text-center w-auto h-auto px-4 py-2 mt-2 mb-6 mx-auto">
            Let's do some exercise
          </button>
        </div>
      );
    } else if (mood === "stable") {
      return (
        <div>
          <p ref={gratitudeSentenceRef} className="text-center italic px-4">
            "A great sense of balance. Keep your steady rhythm and move through
            today at your own pace"
          </p>
          <p className="text-xs italic text-center my-2">Today’s little blessing:</p>
          <button
            onClick={() => {
              safetySectionRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col box-border text-white font-semibold bg-[#4a654e] rounded-2xl items-center justify-center text-center w-auto h-auto px-4 py-2 mt-2 mb-6 mx-auto"
          >
            Express Gratitude
          </button>
        </div>
      );
    } else if (mood === "low") {
      return (
        <div>
          <p ref={gratitudeSentenceRef} className="text-center italic px-4">
            "Thank you for checking in honestly. Having a hard day is okay, and
            it's completely fine to just rest"
          </p>
          <p className="text-xs italic text-center my-2">Start journaling?</p>
          <button onClick={() => 
            navigate("/safety")}
            className="flex flex-col box-border text-white font-semibold bg-[#4a654e] rounded-2xl items-center justify-center text-center w-auto h-auto px-4 py-2 mt-2 mb-6 mx-auto"
            >Click to journal</button>
        </div>
      );
    }
  };
  function handleHoursChange(val) {
  setSleepHours(Math.min(12, Math.max(0, Number(val))));
  }

  function handleMinutesChange(val) {
    setSleepMinutes(Math.min(59, Math.max(0, Number(val))));
  }
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
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  }
  
  function handleTextAreaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    //top page
    <div className="relative bg-[#F5F5F5] min-h-screen">
      <h1 className="text-left text-2xl font-semibold text-gray-900 mx-6 pt-12">
        How are you feeling today?
      </h1>
      <h2 className="text-left text-base text-gray-500 mx-6">
        Take a moment to check in with your inner sanctuary.
      </h2>
      <div className="grid grid-cols-2 gap-6 w-fit mx-auto mt-6 mb-6">
        <div>
          <div>
            {/* button mood track */}
            <button
              onClick={() => {gratitudeSentenceRef.current?.scrollIntoView({ behavior: "smooth"}); setMood("calm")}}
              className="flex flex-col items-center justify-center box-border w-40 h-36 bg-[#EBE9E4] rounded-3xl"
              >
              {/* cloud */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-7 5 26 24"
                fill="none"
                stroke="#3A5340"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                preserveAspectRatio="xMidYMid meet"
                className="w-14 h-14 rounded-full bg-[#D2E6ED] mt-4"
              >
                <path d="M11 17a2.5 2.5 0 0 0-4-2 5 5 0 0 0-8.5 3.5 3 3 0 0 0 3 3h9.5a2.5 2.5 0 0 0 0-5Z" />
              </svg>
              <p className="my-2">Calm</p>
            </button>
          </div>
        </div>
        <button
          onClick={() => setMood("anxious")}
          className="flex flex-col items-center justify-center box-border w-40 h-36 bg-[#EBE9E4] rounded-3xl"
        >
          {/* lightning */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-7 -7 39 39"
            fill="none"
            stroke="#800000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            preserveAspectRatio="xMidYMid meet"
            className="w-14 h-14 rounded-full bg-[#FFB6C1] mt-4"
          >
            <path d="M13 2 L3 14 H12 L11 22 L21 10 H12 Z" />
          </svg>
          <p className="my-2">Anxious</p>
        </button>
        <button
          onClick={() => setMood("stable")}
          className="flex flex-col items-center justify-center box-border w-40 h-36 bg-[#EBE9E4] rounded-3xl"
        >
          {/* cloud */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 0 26 24"
            fill="none"
            stroke="#3A5340"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            preserveAspectRatio="xMidYMid meet"
            className="w-14 h-14 rounded-full bg-[#EDE1C9] mt-4"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v2M12 19v2M5 12H3M21 12h-2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
          </svg>
          <p className="my-2">Stable</p>
        </button>
        <button
          onClick={() => setMood("low")}
          className="flex flex-col items-center justify-center box-border w-40 h-36 bg-[#EBE9E4] rounded-3xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-7 -7 39 39"
            fill="none"
            stroke="#3A5340"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            preserveAspectRatio="xMidYMid meet"
            className="w-14 h-14 rounded-full bg-[#CCEACE] mt-4"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
          <p className="my-2">Low</p>
        </button>
      </div>
      {renderContent()}

      <div className="box border border-gray-300/40 size-84 rounded-4xl mx-auto bg-[#EBE9E4] corner">
        <div className="flex justify-between items-start px-6 pt-6">
          <div>
            <h1 className="text-left text-2xl ml-2">Sleep History</h1>
            <h3 className="text-left text-xs ml-2 mx-6">
              Total duration last night
            </h3>
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
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            <path d="M11 17a2.5 2.5 0 0 0-4-2 5 5 0 0 0-8.5 3.5 3 3 0 0 0 3 3h9.5a2.5 2.5 0 0 0 0-5Z" />
          </svg>
        </div>
        <div className="my-16 mx-4">
          <input
            type="range"
            id="sleepDuration"
            name="sleepDuration"
            min="0"
            max="720"
            step="1"
            onChange={(e) => setSleepDuration(Number(e.target.value) || 0)}
            value={sleepDuration}
            className="w-full h-4 bg-[#E0F4FC] rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none 
             [&::-webkit-slider-thumb]:w-6 
             [&::-webkit-slider-thumb]:h-6 
             [&::-webkit-slider-thumb]:rounded-full 
             [&::-webkit-slider-thumb]:bg-[#384A50]"
          />
          <div className="flex gap-4 max-w-xs mx-auto">
            {/* Kolom Hours */}
            <div className="flex-1">
              <span className="block text-sm font-medium mt-12 ml-2 text-gray-800 mb-2">
                Hours
              </span>
              <div className="bg-white py-4 px-6 rounded-2xl text-center text-xl font-bold  border-gray-100">
                {Math.floor(sleepDuration / 60)}
              </div>
            </div>

            {/* Kolom Minutes */}
            <div className="flex-1">
              <span className="block text-sm font-medium mt-12 ml-2 text-gray-800 mb-2">
                Minutes
              </span>
              <div className="bg-white py-4 px-6 rounded-2xl text-center text-xl font-bold text-gray-800 shadow-sm border border-gray-100">
                {sleepDuration % 60}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="box w-84 h-86 rounded-4xl border-gray-300 mx-auto bg-[#EBE9E4] corner mt-8 overflow-hidden pb-6">
        <div className="flex justify-between items-center px-8 pt-6">
          <div>
            <h1 className="text-2xl mt-4 font-medium text-gray-700">
              Daily Summary
            </h1>
            <h3 className="text-sm text-gray-500 mt-1">
              {today.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
          </div>
          {/*kalendar logo : terakhir sampe sini belum atur*/}
          <div className="bg-white flex justify-between p-2 border border-gray-300 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
          </div>
        </div>

        
      </div>

      <div className="box w-84 h-64 bg-[#EBE9E4] rounded-4xl my-6 mx-auto">
        {/* Gratitude Area */}
        <h1 className="text-xl font-semibold pl-8 pt-6 text-gray-700">
          Today's notes
          </h1>
        <div ref={safetySectionRef} className="space-y-4">
          <div className="">
            {status === "success" ? (
              <p className="text-[14px] font-semibold text-[#4a654e] text-center py-6">
                Very well, gratitude saved!
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Kotak Input Textarea */}
                <textarea
                  value={answer}
                  onChange={handleTextAreaChange}
                  disabled={status === "submitting"}
                  placeholder="How was your day? Write anything that comes to mind..."
                  className=" mt-4 mx-6 bg-white/40 border border-white/60 rounded-2xl p-4 resize-none outline-none text-[16px] text-[#1b1c1a] placeholder:text-[#424842]/50 min-h-28 focus:bg-white/60  transition-all disabled:opacity-50"
                />

                {/* Tombol Simpan */}
                <button
                  onClick={handleSubmit}
                  disabled={answer.length === 0 || status === "submitting"}
                  className="mx-6 m py-4 mb-4 rounded-full bg-[#4a654e] text-white text-[14px] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#4a654e]/20 active:scale-[0.98] transition-all disabled:opacity-40"
                >
                  <span>
                    {status === "submitting" ? "Saving..." : "Save Entry"}
                  </span>
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
                  <p className="text-[12px] text-red-500 text-center">
                    {error.message}
                  </p>
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
