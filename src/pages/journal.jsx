import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const MOODS = [
  { value: "happy", score: 100, color: "#4a654e" },
  { value: "stable", score: 66, color: "#7aab7e" },
  { value: "low", score: 43, color: "#c9b96a" },
  { value: "anxious", score: 10, color: "#d4826e" },
];

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMoodConfig(moodValue) {
  return MOODS.find((m) => m.value === moodValue) || null;
}

/**
 * Aggregates entries into past 7 days bar data.
 * TODO (API): replace with GET /api/journal/weekly-summary
 */
function buildWeekBars(entries) {
  const today = new Date();
  const bars = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateLabel = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const dayEntries = entries.filter(
      (e) => e.date === dateLabel && e.moodScore !== null,
    );

    if (dayEntries.length === 0) {
      bars.push({ score: null, color: "rgba(74,101,78,0.15)" });
    } else {
      const avgScore = Math.round(
        dayEntries.reduce((s, e) => s + e.moodScore, 0) / dayEntries.length,
      );
      let color = "#4a654e";
      if (avgScore < 20) color = "#d4826e";
      else if (avgScore < 55) color = "#c9b96a";
      else if (avgScore < 85) color = "#7aab7e";
      bars.push({ score: avgScore, color });
    }
  }

  return bars;
}

// ─── WeekChart ────────────────────────────────────────────────────────────────

function WeekChart({ bars }) {
  return (
    <div
      className="rounded-4xl px-5 py-4"
      style={{
        backgroundColor: "rgba(204,234,206,0.2)",
        border: "1px solid rgba(204,234,206,0.4)",
      }}
    >
      <div className="flex items-end justify-between h-16 gap-1.5">
        {bars.map((bar, i) => {
          const heightPct = bar.score !== null ? Math.max(bar.score, 10) : 10;
          return (
            <motion.div
              key={i}
              className="flex-1 rounded-t-md"
              initial={{ height: 0 }}
              animate={{ height: `${(heightPct / 100) * 64}px` }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.04 }}
              style={{
                backgroundColor: bar.color,
                opacity: bar.score === null ? 0.4 : 1,
                alignSelf: "flex-end",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
// nanti pelajarin fetch data dari API untuk menampilkan data mood
// ─── Main Component ───────────────────────────────────────────────────────────

export function Journal() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);
  const [saveState, setSaveState] = useState("idle");
  const [expandedEntry, setExpandedEntry] = useState(null);
  const autosaveTimer = useRef(null);
  const entriesRef = useRef(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("http://localhost:5000/journal-input");
        const data = await res.json();
        setEntries(data.data); // isi state dengan entries dari server
      } catch (err) {
        console.log("gagal fetch entries", err);
      }
    };

    fetchEntries();
  }, []);

  // mood & moodScore diambil dari halaman Mood, di-pass via props / global state
  // untuk sementara diterima sebagai prop; default null
  // contoh integrasi: <Journal currentMood="stable" currentMoodScore={66} />
  const currentMood = null; // ganti dengan props.currentMood atau context
  const currentMoodScore = null; // ganti dengan props.currentMoodScore atau context

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      if (e.target.value.trim()) {
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 2000);
      }
    }, 3000);
  };

  const handleSave = async () => {
    if (!text.trim()) return;
    const now = new Date();
    const dateLabel = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const firstLine = text.split("\n").find((l) => l.trim()) || "Untitled";

    const newEntry = {
      id: Date.now(),
      date: dateLabel,
      title: title.trim() || firstLine.slice(0, 60),
      body: text,
      mood: currentMood,
      moodScore: currentMoodScore,
    };
    try {
      const res = await fetch("http://localhost:5000/journal-input", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title: newEntry.title,
          body: newEntry.body,
          mood: newEntry.mood,
          moodScore: newEntry.moodScore,
        }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      setEntries((prev) => [newEntry, ...prev]);
      setText("");
      setTitle("");
      setSaveState("idle");

      setTimeout(() => {
        entriesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (err) {
      console.log("tidak berhasil fetch", err);
    }
  };

  

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    await fetch ("http://localhost:5000/journal-input", {
      method: "DELETE"
    });
    setEntries((prev) => prev.filter((en) => en.id !== id));
    if (expandedEntry === id) setExpandedEntry(null);
  };

  const saveLabel =
    saveState === "saved"
      ? "Autosaved ✓"
      : saveState === "saving"
        ? "Saving..."
        : "Save Entry";

  const saveBtnClass =
    saveState === "saved"
      ? "bg-[#cceace] text-[#233d29]"
      : "bg-[#4a654e] text-white hover:bg-[#3d5541]";

  const weekBars = buildWeekBars(entries);

  return (
    <div
      className="page-transition relative min-h-screen pb-24"
      style={{
        backgroundColor: "#fbf9f5",
        fontFamily: "'Be Vietnam Pro', sans-serif",
      }}
    >
      <main className="max-w-300 mx-auto px-5 md:px-10 pt-8">
        <section className="mb-8 text-center">
          <h2
            className="text-4xl sm:text-5xl font-semibold mb-2"
            style={{
              color: "#4a654e",
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            How are you feeling?
          </h2>
          <p
            className="text-base max-w-md mx-auto"
            style={{ color: "#424842" }}
          >
            Take a moment to ground yourself. There is no right or wrong way to
            feel.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Editor ── */}
          <div
            className="lg:col-span-8 rounded-4xl p-8 shadow-sm"
            style={{ backgroundColor: "#ffffff" }}
          >
            <input
              type="text"
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-xl font-semibold mb-4 placeholder:font-normal"
              style={{ color: "#1b1c1a" }}
              placeholder="Entry title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
            />
            <div style={{ borderTop: "1px solid #e4e2de" }} className="mb-4" />

            <textarea
              className="w-full min-h-90 bg-transparent border-none focus:outline-none focus:ring-0 resize-none leading-relaxed text-lg"
              style={{ color: "#1b1c1a" }}
              placeholder="Start typing your thoughts here..."
              value={text}
              onChange={handleTextChange}
            />

            <div
              className="flex items-center justify-end mt-6 pt-5"
              style={{ borderTop: "1px solid #e4e2de" }}
            >
              <button
                onClick={handleSave}
                disabled={!text.trim()}
                className={`px-8 py-3 rounded-full text-sm font-semibold shadow-sm transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${saveBtnClass}`}
              >
                {saveLabel}
              </button>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Compact week chart — bar + warna saja */}
            <WeekChart bars={weekBars} />

            {/* Previous entries */}
            <div className="space-y-4" ref={entriesRef}>
              <div className="flex items-center justify-between px-1">
                <h3
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#737972" }}
                >
                  Previous Entries
                </h3>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#4a654e" }}
                >
                  {entries.length} total
                </span>
              </div>

              {entries.length === 0 && (
                <p
                  className="text-sm text-center py-6"
                  style={{ color: "#737972" }}
                >
                  No entries yet. Write your first one!
                </p>
              )}

              <AnimatePresence initial={false}>
                {entries.map((entry) => {
                  const mc = getMoodConfig(entry.mood);
                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -50, scale: 0.9 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      onClick={() =>
                        setExpandedEntry(
                          expandedEntry === entry.id ? null : entry.id,
                        )
                      }
                      className="rounded-2xl p-4 cursor-pointer transition-colors"
                      style={{
                        backgroundColor:
                          expandedEntry === entry.id ? "#eae8e4" : "#efeeea",
                      }}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "#4a654e" }}
                          >
                            {entry.date}
                          </span>
                          {mc && (
                            <span
                              className="w-2 h-2 rounded-full inline-block"
                              style={{ backgroundColor: mc.color }}
                              title={entry.mood}
                            />
                          )}
                        </div>
                        <button
                          onClick={(e) => handleDelete(entry.id, e)}
                          className="text-xs font-medium px-2 py-0.5 rounded-full transition-colors hover:bg-red-100 hover:text-red-600"
                          style={{ color: "#737972" }}
                          aria-label="Delete entry"
                        >
                          delete
                        </button>
                      </div>

                      <h4
                        className="text-sm font-semibold leading-snug mb-1"
                        style={{
                          color: "#1b1c1a",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        {entry.title}
                      </h4>
                      <div
                        style={{ borderTop: "1px solid #d8d6d2" }}
                        className="mb-2"
                      />

                      <p
                        className={`text-sm leading-relaxed transition-all ${
                          expandedEntry === entry.id ? "" : "line-clamp-2"
                        }`}
                        style={{ color: "#424842" }}
                      >
                        {entry.body}
                      </p>

                      {entry.body.length > 120 && (
                        <span
                          className="text-xs mt-1 block"
                          style={{ color: "#4a654e" }}
                        >
                          {expandedEntry === entry.id
                            ? "Show less ↑"
                            : "Read more ↓"}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Journal;
