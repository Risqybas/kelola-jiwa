import { useState } from "react";
import risqyImg from "../assets/risqy.png";

const groundingExercises = [
  {
    icon: "visibility",
    title: "5-4-3-2-1 Technique",
    desc: "Focus on 5 things you see, 4 you feel, 3 you hear...",
  },
  {
    icon: "air",
    title: "Box Breathing",
    desc: "Inhale for 4, hold for 4, exhale for 4, hold for 4.",
  },
  {
    icon: "back_hand",
    title: "Sensory Hold",
    desc: "Hold an ice cube or a textured object to reset senses.",
  },
];

const emergencyContacts = [
  {
    type: "contact",
    name: "Muhammad Risqy",
    sub: "Developer this app",
    img: risqyImg,
    avatarBg: "bg-[#d1c5ae]",
  },
  {
    type: "contact",
    name: "Alex (Partner)",
    sub: "Primary Support Circle",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3KZzY81Y_O5WA-RgbIQrNMCqEyJ7qTbVsjfWSOBs9u_2IvP5IbcrEXMv57n98lDZn3-ZcradxONopuAH1WaosV4OlXFR5oSVy6n60lZguoPyE7z5tuNhRAvvxA9hwrQD7w_AabQV9o0WXcozUqDLis9uybXRriRpf6eTNNfJqXTzalPJRg7R114naQwL1lA8d5Sjs6I0xBuiGG4od4lhgp9F5YeBpuDK1RlyJJujdigVZ34wax_DrOmrGi297e87jmQp2zqsHX_yH",
    avatarBg: "bg-[#b0ceb2]",
  },
];

function GroundingCard({ icon, title, desc }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(true);
    setTimeout(() => setActive(false), 400);
  };

  return (
    <div
      onClick={handleClick}
      className={`p-5 rounded-2xl border transition-colors cursor-pointer group ${
        active
          ? "bg-white ring-2 ring-[#4a654e]/20 border-[#4a654e]/40"
          : "bg-[#f5f3ef] border-[#c2c8c0]/30 hover:border-[#4a654e]/40"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-[#d2e6ed] rounded-xl text-[#55676e]">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold tracking-wide text-[#1b1c1a] mb-1">
            {title}
          </h4>
          <p className="text-sm text-[#424842]">{desc}</p>
        </div>
        <span className="material-symbols-outlined text-[#737972] group-hover:text-[#4a654e] transition-colors">
          chevron_right
        </span>
      </div>
    </div>
  );
}

export default function Safety() {
  return (
    <div className="page-transition relative min-h-screen pb-24">
    <div className="bg-[#fbf9f5] text-[#1b1c1a] min-h-screen flex flex-col overflow-x-hidden">

      {/* Main */}
      <main className="grow max-w-300 mx-auto w-full px-5 md:px-10 pt-8 pb-32">

        {/* Hero */}
        <section className="mb-8">
          <div className="bg-[#8ba88e]/10 p-8 rounded-4xl flex flex-col items-center text-center gap-6 shadow-sm border border-[#4a654e]/5">
            <div className="w-24 h-24 bg-[#4a654e] text-white rounded-full flex items-center justify-center shadow-lg animate-pulse-soft">
              <span
                className="material-symbols-outlined text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                call
              </span>
            </div>
            <div>
              <h2 className="text-2xl md:text-[32px] font-semibold leading-tight text-[#1b1c1a] mb-2 font-['Plus_Jakarta_Sans']">
                Need immediate support?
              </h2>
              <p className="text-base text-[#424842] max-w-md mx-auto">
                Your safety circle is just one tap away. Take a deep breath.
              </p>
            </div>
            <button className="w-full max-w-sm py-5 bg-[#4a654e] text-white text-2xl font-medium rounded-2xl shadow-md active:scale-95 transition-all hover:bg-[#334d38] font-['Plus_Jakarta_Sans']">
              Call Family
            </button>
          </div>
        </section>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">

          {/* Grounding Exercises */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <span className="material-symbols-outlined text-[#4a654e]">spa</span>
              <h3 className="text-2xl font-medium text-[#1b1c1a] font-['Plus_Jakarta_Sans']">
                Grounding Exercises
              </h3>
            </div>
            <div className="space-y-4">
              {groundingExercises.map((ex) => (
                <GroundingCard key={ex.title} {...ex} />
              ))}
            </div>
          </section>

          {/* Emergency Contacts */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <span className="material-symbols-outlined text-[#ba1a1a]">
                contact_emergency
              </span>
              <h3 className="text-2xl font-medium text-[#1b1c1a] font-['Plus_Jakarta_Sans']">
                Emergency Contacts
              </h3>
            </div>
            <div className="space-y-4">

              {/* Crisis Hotline */}
              <div className="bg-[#ffdad6]/30 p-5 rounded-2xl border border-[#ba1a1a]/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      emergency
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide text-[#1b1c1a]">
                      Crisis Hotline
                    </h4>
                    <p className="text-sm text-[#424842]">Available 24/7 • 988</p>
                  </div>
                </div>
                <button className="p-3 bg-[#ba1a1a]/10 text-[#ba1a1a] rounded-full hover:bg-[#ba1a1a] hover:text-white transition-all active:scale-90">
                  <span className="material-symbols-outlined">call</span>
                </button>
              </div>

              {/* Contact Cards */}
              {emergencyContacts.map((contact) => (
                <div
                  key={contact.name}
                  className="bg-[#f5f3ef] p-5 rounded-2xl border border-[#c2c8c0]/30 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full ${contact.avatarBg} flex items-center justify-center overflow-hidden`}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={contact.img}
                        alt={contact.name}
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold tracking-wide text-[#1b1c1a]">
                        {contact.name}
                      </h4>
                      <p className="text-sm text-[#424842]">{contact.sub}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-[#d2e6ed] text-[#55676e] rounded-full hover:bg-[#4f6168] hover:text-white active:scale-90 transition-all">
                      <span className="material-symbols-outlined text-[20px]">
                        chat_bubble
                      </span>
                    </button>
                    <button className="p-3 bg-[#d2e6ed] text-[#55676e] rounded-full hover:bg-[#4f6168] hover:text-white active:scale-90 transition-all">
                      <span className="material-symbols-outlined text-[20px]">
                        call
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Quote */}
        <div className="mt-8 relative h-32 rounded-3xl overflow-hidden bg-[#8ba88e]/10 border border-[#4a654e]/5">
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <p className="text-xl md:text-2xl font-medium text-[#4a654e]/80 italic font-['Plus_Jakarta_Sans']">
              "This too shall pass. You are safe here."
            </p>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
}
