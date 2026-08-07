import { useState } from "react";
import bgImage from "../assets/calmPic.jpg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  TiWeatherPartlySunny,
  TiWeatherSunny,
  TiWeatherNight,
  TiArrowSortedDown,
} from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";

export function Medications() {
  const [inputTablet, setInputTablet] = useState("");
  const [submitFrequency, setSubmitFrequency] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("Morning");
  const [showForm, setShowForm] = useState(false);
  const [medications, setMedications] = useState([]);

  const menuItems = [
    {
      label: "Morning",
      icon: <TiWeatherPartlySunny className="size-6 fill-gray-800" />,
    },
    {
      label: "Afternoon",
      icon: <TiWeatherSunny className="size-6 fill-gray-800" />,
    },
    {
      label: "Night",
      icon: <TiWeatherNight className="size-6 fill-gray-800" />,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputTablet.trim()) return;

    const newMedication = {
      id: Date.now(),
      tablet: inputTablet,
      schedule: selectedSchedule,
      frequency: submitFrequency || "No frequency provided.",
    };

    setMedications([newMedication, ...medications]); // Muncul paling atas

    setInputTablet("");
    setSubmitFrequency("");
    setSelectedSchedule("Morning");
    setShowForm(false);
  };

  const handleDelete = (idToDelete) => {
    setMedications(medications.filter((item) => item.id !== idToDelete));
  };

  return (
    <div className="page-transition relative bg-[#F5F5F5] min-h-screen pb-16">
      <h1 className="text-left text-3xl font-semibold text-gray-900 mx-6 pt-6">
        Medications
      </h1>
      <h2 className="text-left text-base text-gray-500 mx-6">
        Maintaining your rhythm with gentle reminders and mindful tracking.
      </h2>

      <div className="flex justify-center">
        <button
          className="box-border w-90 h-12 bg-[#4a654e] rounded-4xl mt-6 font-medium text-white cursor-pointer hover:bg-[#3d5340] transition-colors"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Medications"}
        </button>
      </div>

      {/* Animasi untuk Form Input */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 px-6 mt-4 overflow-hidden"
          >
            <div>
              <p className="text-sm font-medium text-[#3A5340] mb-1 ml-1">
                Medication Name
              </p>
              <input
                type="text"
                value={inputTablet}
                onChange={(e) => setInputTablet(e.target.value)}
                placeholder="e.g. Paracetamol, Amoxicillin"
                className="w-full h-12 bg-white/40 border border-[#4a654e]/30 rounded-2xl pl-4 pr-4 outline-none text-[16px] text-[#1b1c1a] placeholder:text-[#424842]/40 focus:bg-white/60 focus:border-[#4a654e]/60 shadow-sm transition-all"
              />
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-[#3A5340] mb-1 ml-1">
                  Schedule
                </p>
                <Menu as="div" className="relative">
                  <MenuButton className="inline-flex items-center gap-2 rounded-2xl h-12 bg-[#F2F0ED] px-4 text-sm font-semibold text-gray-800 border border-gray-400 shadow-inner focus:outline-none">
                    {selectedSchedule}
                    <TiArrowSortedDown className="size-4 fill-gray-800" />
                  </MenuButton>
                  <MenuItems
                    transition
                    anchor="bottom start"
                    className="z-50 w-48 origin-top-right rounded-xl border border-gray-200 bg-white p-1 text-sm shadow-lg text-gray-800 transition duration-100 focus:outline-none"
                  >
                    {menuItems.map(({ label, icon }) => (
                      <MenuItem key={label}>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => setSelectedSchedule(label)}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-gray-800`}
                          >
                            {icon}
                            {label}
                          </button>
                        )}
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>

              <div className="flex flex-col flex-1">
                <p className="text-sm font-medium text-[#3A5340] mb-1 ml-1">
                  Frequency
                </p>
                <input
                  type="text"
                  value={submitFrequency}
                  onChange={(e) => setSubmitFrequency(e.target.value)}
                  placeholder="e.g. Once daily"
                  className="w-full h-12 bg-white/40 border border-[#4a654e]/30 rounded-2xl pl-4 pr-4 outline-none text-[16px] text-[#1b1c1a] placeholder:text-[#424842]/40 focus:bg-white/60 focus:border-[#4a654e]/60 shadow-sm transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#4a654e] rounded-4xl mt-2 font-medium text-white cursor-pointer hover:bg-[#3d5340] transition-colors"
            >
              Submit
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Render Daftar Obat dengan Animasi Item */}
      <div className="mt-6 mx-6 space-y-3">
        <AnimatePresence initial={false}>
          {medications.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-4 bg-[#DAF9DB]/40 border border-[#4a654e]/40 rounded-2xl flex justify-between items-start shadow-sm"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 mb-1 rounded-full text-xs font-semibold bg-[#4a654e]/10 text-[#3A5340]">
                  {item.schedule}
                </span>
                <p className="text-lg font-semibold text-[#3A5340]">
                  {item.tablet}
                </p>
                <p className="text-sm font-medium text-[#3A5340]/80">
                  {item.frequency}
                </p>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
              >
                Hapus
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Gentle Reminder */}
      <div className="flex justify-center my-6">
        <div className="box-border border-2 border-dashed border-[#4a654e]/40 w-90 h-52 bg-[#DAF9DB]/30 rounded-3xl p-4 flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
            stroke="#3A5340"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-16 h-16 rounded-full bg-[#7B987F]/10 p-2 mb-2"
          >
            <path d="M 50 18 C 41 32, 41 48, 50 62 C 59 48, 59 32, 50 18 Z" />
            <path d="M 28 44 C 28 72, 40 80, 50 80 C 60 80, 72 72, 72 44" />
            <path d="M 28 44 C 36 46, 44 54, 50 62" />
            <path d="M 72 44 C 64 46, 56 54, 50 62" />
            <path d="M 50 62 L 50 80" />
          </svg>
          <p className="text-xl font-semibold text-[#3A5340]">Gentle Reminder</p>
          <p className="text-sm italic text-center mx-4 text-[#3A5340]/80 mt-1">
            Consistent tracking helps you and your provider identify patterns
            for better care.
          </p>
        </div>
      </div>

      {/* Picture with Quotes */}
      <div className="flex justify-center items-center py-4">
        <div className="relative w-90 h-52 rounded-[2.5rem] overflow-hidden bg-cover bg-center flex items-center justify-center p-6 shadow-md">
          <img
            src={bgImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
          <p className="relative z-10 text-center font-semibold text-white italic leading-snug drop-shadow-md">
            "Small steps lead to great changes."
          </p>
        </div>
      </div>
    </div>
  );
}

export default Medications;