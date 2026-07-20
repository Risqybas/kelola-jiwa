import { useEffect, useMemo, useState } from "react";

const moodOptions = [
  { value: "calm", label: "Calm", emoji: "🌿", detail: "Grounded and centered." },
  { value: "anxious", label: "Anxious", emoji: "💫", detail: "Restless and tense." },
  { value: "stable", label: "Stable", emoji: "🧘", detail: "Balanced and steady." },
  { value: "low", label: "Low", emoji: "☁️", detail: "Quiet and reflective." },
];

const summaryFallback = {
  insights:
    "Your mood check-in looks balanced today. Keep nurturing your sleep routine and notice what helps you stay calm.",
};

const Mood = () => {
  const [mood, setMood] = useState("");
  const [sleepDuration, setSleepDuration] = useState(420);
  const [summaryData, setSummaryData] = useState(null);
  const today = new Date();

  const selectedMood = moodOptions.find((option) => option.value === mood);
  const sleepHours = Math.floor(sleepDuration / 60);
  const sleepMinutes = sleepDuration % 60;

  const sleepMessage = useMemo(() => {
    if (sleepDuration >= 480) return "Great rest — keep the rhythm going.";
    if (sleepDuration >= 360) return "Decent sleep, try to recover a bit more.";
    return "A little light on rest. Consider winding down earlier tonight.";
  }, [sleepDuration]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSummary() {
      try {
        const response = await fetch("https://api.example.com/daily-summary", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Summary request failed");
        }
        const data = await response.json();
        setSummaryData(data);
      } catch {
        setSummaryData(summaryFallback);
      }
    }

    fetchSummary();
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(79,111,82,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(245,205,140,0.18),_transparent_24%),#F6F3EE] text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Daily Tracker</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                How are you feeling today?
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Check in with your mood, rest, and energy so you have a gentle guide for the day ahead.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200 shadow-sm">
              <span className="text-2xl">☀️</span>
              <span>{today.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}</span>
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <div className="space-y-6">
            <section className="rounded-[2rem] bg-white/90 p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Mood check-in</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Select the mood that best describes how you feel right now.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                  {selectedMood ? selectedMood.label : "Tap a mood card"}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {moodOptions.map((option) => {
                  const isSelected = option.value === mood;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setMood(option.value)}
                      className={`flex w-full items-start gap-4 rounded-[1.75rem] border p-5 text-left transition duration-200 ${
                        isSelected
                          ? "border-emerald-200 bg-emerald-50 shadow-sm"
                          : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      <div className="grid h-14 w-14 place-items-center rounded-3xl bg-white text-2xl shadow-sm">
                        {option.emoji}
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-slate-900">{option.label}</p>
                        <p className="mt-1 text-sm text-slate-500">{option.detail}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-[1.75rem] bg-slate-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Current mood summary
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {selectedMood
                    ? `You feel ${selectedMood.label.toLowerCase()}. ${selectedMood.detail} Take a moment to notice what helped you arrive here.`
                    : "Choose one of the options above to see a short mood summary and gentle guidance."}
                </p>
              </div>
            </section>

            <section className="rounded-[2rem] bg-white/90 p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Sleep history</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Adjust your sleep duration for last night and watch how your rest score changes.
                  </p>
                </div>
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  {sleepHours}h {sleepMinutes}m
                </div>
              </div>

              <div className="mt-8">
                <input
                  type="range"
                  id="sleepDuration"
                  name="sleepDuration"
                  min="0"
                  max="720"
                  step="10"
                  value={sleepDuration}
                  onChange={(e) => setSleepDuration(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-slate-50 p-5 text-center text-slate-900 shadow-sm ring-1 ring-slate-200">
                    <p className="text-sm font-medium text-slate-500">Hours</p>
                    <p className="mt-4 text-3xl font-semibold">{sleepHours}</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-slate-50 p-5 text-center text-slate-900 shadow-sm ring-1 ring-slate-200">
                    <p className="text-sm font-medium text-slate-500">Minutes</p>
                    <p className="mt-4 text-3xl font-semibold">{sleepMinutes}</p>
                  </div>
                </div>
                <div className="mt-6 rounded-[1.5rem] bg-emerald-50 px-5 py-4 text-slate-800 ring-1 ring-emerald-200">
                  <p className="text-sm font-semibold">Sleep note</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{sleepMessage}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[2rem] bg-white/90 p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Daily summary</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">Today&apos;s insights</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
                  <span className="text-lg">📅</span>
                  {today.toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-sm leading-7 text-slate-600">
                  {summaryData ? summaryData.insights : "Loading insights..."}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-sm text-slate-500">Mood balance</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-900">Good</p>
                  </div>
                  <div className="rounded-[1.75rem] bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-sm text-slate-500">Rest quality</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-900">{sleepDuration >= 420 ? "Strong" : "Needs attention"}</p>
                  </div>
                  <div className="rounded-[1.75rem] bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-sm text-slate-500">Energy</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-900">{mood ? (mood === "anxious" ? "Uneasy" : mood === "low" ? "Calm" : "Balanced") : "Ready"}</p>
                  </div>
                  <div className="rounded-[1.75rem] bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-sm text-slate-500">Focus</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-900">{mood === "anxious" ? "Mild" : "Clear"}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] bg-white/90 p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Wellness snapshot</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">Quick view</h2>
                </div>
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-900">Live</span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] bg-emerald-50 p-5 ring-1 ring-emerald-200">
                    <p className="text-sm font-medium text-emerald-700">Today&apos;s score</p>
                    <p className="mt-4 text-3xl font-semibold text-slate-900">82</p>
                    <p className="mt-2 text-sm text-slate-600">Stable mood and restful sleep.</p>
                  </div>
                  <div className="rounded-[1.75rem] bg-slate-50 p-5 ring-1 ring-slate-200">
                    <p className="text-sm font-medium text-slate-500">Mindful moment</p>
                    <p className="mt-4 text-3xl font-semibold text-slate-900">6 min</p>
                    <p className="mt-2 text-sm text-slate-600">Soft breathing exercise recommended.</p>
                  </div>
                </div>

                <div className="space-y-3 rounded-[1.75rem] bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="text-sm font-medium text-slate-500">Recommended actions</p>
                  <ul className="space-y-2 text-sm leading-6 text-slate-700">
                    <li>• Drink water before starting the day.</li>
                    <li>• Spend five minutes journaling how you feel.</li>
                    <li>• Keep your sleep routine consistent tonight.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mood;
