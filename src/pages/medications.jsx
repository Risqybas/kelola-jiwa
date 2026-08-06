import { useState, useEffect } from "react";
import bgImage from "../assets/calmPic.jpg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  TiWeatherPartlySunny,
  TiWeatherSunny,
  TiWeatherNight,
  TiArrowSortedDown,
} from "react-icons/ti";

export function Medications() {
  const [inputTablet, setInputTablet] = useState("");
  const [submittedTablet, setSubmittedTablet] = useState("");
  const [submitFrequency, setSubmitFrequency] = useState("");
  const [schedule, setSchedule] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("defaultSchedule");
  const [showForm, setShowForm] = useState(false);
  const isTablet = submittedTablet.toLowerCase().includes("tablet");

  const [selected, setSelected] = useState("Options");

  const menuItems = [
    {
      label: "Morning",
      icon: <TiWeatherPartlySunny className="size-6 fill-gray-800" />,
      kbd: "⌘E",
    },
    {
      label: "Afternoon",
      icon: <TiWeatherSunny className="size-6 fill-gray-800" />,
      kbd: "⌘D",
    },
    {
      label: "Night",
      icon: <TiWeatherNight className="size-6 fill-gray-800" />,
      kbd: "⌘A",
    },
  ];

  const handlebuttonClick = () => {
    setSubmittedTablet(inputTablet);
    setInputTablet("");
    setShowForm(false);
  };

  const handleScheduleChange = (newSchedule) => {
    setSelectedSchedule(newSchedule);
  };

  const handleSaveSchedule = () => {
    setSchedule(selectedSchedule);
  };

  async function handleInputChange(event) {
    setInputTablet(event.target.value);
  }

  return (
    <div className="page-transition relative bg-[#F5F5F5] min-h-screen">
      <h1 className="text-left text-3xl font-semibold text-gray-900 mx-6 pt-6">
        Medications
      </h1>
      <h2 className="text-left text-base text-gray-500 mx-6">
        Maintaining your rhythm with gentle reminders and mindful tracking.
      </h2>
      <div className=" flex justify-center">
        <button
          className="box-border w-90 h-12 bg-[#4a654e] rounded-4xl mt-6 font-medium text-white"
          onClick={() => {
            setShowForm(true);
          }}
        >
          + Add Medications
        </button>
      </div>
      {showForm && (
        <div className="flex flex-col gap-3 px-6">
          {/* Label */}
          <p className="text-sm font-medium text-[#3A5340] mt-4 ml-1">
            Medication Name
          </p>
          <div className="relative">
            <input
              type="text"
              value={inputTablet}
              onChange={(e) => setInputTablet(e.target.value)}
              placeholder="e.g. Paracetamol, Amoxicillin"
              className="w-full h-12 bg-white/40 border border-[#4a654e]/30 rounded-2xl pl-4 pr-4 outline-none text-[16px] text-[#1b1c1a] placeholder:text-[#424842]/40 focus:bg-white/60 focus:border-[#4a654e]/60 shadow-sm transition-all"
            />
            <div className="flex items-center">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-[#3A5340] mt-2 ml-2 mb-2">
                  Schedule
                </p>
                <Menu>
                  <MenuButton className="inline-flex items-center gap-2 rounded-2xl h-12 bg-[#F2F0ED] px-3 py-1.5 text-sm/6 font-semibold text-gray-800 border border-gray-400 shadow-inner shadow-white/10 focus:outline focus:outline-gray-400 data-open:bg-[#F2F0ED]">
                    {selected}
                    <TiArrowSortedDown className="size-4 fill-gray-800" />
                  </MenuButton>
                  <MenuItems
                    transition
                    anchor="bottom end"
                    className="ml-4 z-50 w-52 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 shadow-lg text-gray-800 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                  >
                    {menuItems.map(({ label, icon, kbd }) => (
                      <MenuItem key={label}>
                        <button
                          onClick={() => setSelected(label)}
                          className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                        >
                          {icon}
                          {label}
                          <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                            {kbd}
                          </kbd>
                        </button>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-[#3A5340] mt-4 ml-6">
                  Frequency
                </p>
                <input
                  type="text"
                  value={submitFrequency}
                  onChange={(e) => setSubmitFrequency(e.target.value)}
                  placeholder="e.g. Once daily, etc"
                  className="w-62 h-12 my-2 ml-4 bg-white/40 border border-[#4a654e]/30 rounded-2xl pl-4 pr-4 outline-none text-[16px] text-[#1b1c1a] placeholder:text-[#424842]/40 focus:bg-white/60 focus:border-[#4a654e]/60 shadow-sm transition-all"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handlebuttonClick}
            className="w-full h-12 bg-[#4a654e] rounded-4xl mt-1 font-medium text-white"
          >
            Submit
          </button>
        </div>
      )}
      {submittedTablet && (
        <div className="mt-4 mx-6 p-4  bg-[#DAF9DB]/40 border border-[#4a654e]/40 rounded-2xl">
          <p className="text-sm font-medium text-[#3A5340]">
            {schedule || "No schedule provided."}
          </p>
          <p className="text-lg font-medium text-[#3A5340]">
            Submitted Medication: {submittedTablet}
          </p>
          <p className="text-sm font-medium text-[#3A5340]">
            {submitFrequency || "No frequency provided."}
          </p>
        </div>
      )}

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
