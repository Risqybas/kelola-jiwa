import { useState, useRef } from "react";

export function Journal() {
  const [title, setTitle] = useState("");   // +
  const [text, setText] = useState("");
  const [mood, setMood] = useState(null);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [entries, setEntries] = useState([]);
  const [saveState, setSaveState] = useState("idle");
  const [expandedEntry, setExpandedEntry] = useState(null);
  const autosaveTimer = useRef(null);

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

  const handleSave = () => {
    if (!text.trim()) return;
    const now = new Date();
    const dateLabel = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const firstLine = text.split("\n").find((l) => l.trim()) || "Untitled";
    const newEntry = {
      id: Date.now(),
      date: dateLabel,
      title: title.trim() || firstLine.slice(0, 60),   // +
      body: text,
      mood,
    };
    setEntries([newEntry, ...entries]);
    setText("");
    setTitle("");   // +
    setMood(null);
    setSaveState("idle");
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setEntries(entries.filter((en) => en.id !== id));
    if (expandedEntry === id) setExpandedEntry(null);
  };

  const saveLabel =
    saveState === "saved" ? "Autosaved ✓" : saveState === "saving" ? "Saving..." : "Save Entry";

  const saveBtnClass =
    saveState === "saved"
      ? "bg-[#cceace] text-[#233d29]"
      : "bg-[#4a654e] text-white hover:bg-[#3d5541]";

  return (
    <div
      className="page-transition relative min-h-screen pb-24"
      style={{ backgroundColor: "#fbf9f5", fontFamily: "'Be Vietnam Pro', sans-serif" }}
    >
      <main className="max-w-300 mx-auto px-5 md:px-10 pt-8">
        <section className="mb-8 text-center">
          <h2
            className="text-4xl sm:text-5xl font-semibold mb-2"
            style={{ color: "#4a654e", fontFamily: "'Dancing Script', cursive" }}
          >
            How are you feeling?
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "#424842" }}>
            Take a moment to ground yourself. There is no right or wrong way to feel.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div
            className="lg:col-span-8 rounded-4xl p-8 relative group shadow-sm"
            style={{ backgroundColor: "#ffffff" }}
          >
            {/* +++ TITLE INPUT SECTION +++ */}
            <input
              type="text"
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-xl font-semibold mb-4 placeholder:font-normal"
              style={{ color: "#1b1c1a"}}
              placeholder="Entry title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
            />
            <div style={{ borderTop: "1px solid #e4e2de" }} className="mb-4" />
            {/* +++ END TITLE INPUT SECTION +++ */}

            <textarea
              className="w-full min-h-90 bg-transparent border-none focus:outline-none focus:ring-0 resize-none leading-relaxed text-lg"
              style={{ color: "#1b1c1a" }}
              placeholder="Start typing your thoughts here..."
              value={text}
              onChange={handleTextChange}
            />

            <div
              className="flex items-center justify-between mt-6 pt-5"
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

          <aside className="lg:col-span-4 space-y-8">
            <div
              className="rounded-4xl p-6"
              style={{
                backgroundColor: "rgba(204,234,206,0.2)",
                border: "1px solid rgba(204,234,206,0.4)",
              }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#233d29", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Past 7 Days
              </h3>
              <div className="flex items-end justify-between h-24 gap-2 mb-4">
                {[50, 75, 100, 66, 50, 33, 50].map((h, i) => (
                  <div
                    key={i}
                    className={`w-full rounded-t-lg ${i === 2 ? "animate-pulse" : ""}`}
                    style={{
                      height: `${h}%`,
                      backgroundColor: i === 2 ? "#4a654e" : "rgba(74,101,78,0.4)",
                    }}
                  />
                ))}
              </div>
              <p className="text-xs font-semibold text-center" style={{ color: "#233d29" }}>
                Consistent reflection helps stability.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#737972" }}
                >
                  Previous Entries
                </h3>
                <span className="text-xs font-semibold" style={{ color: "#4a654e" }}>
                  {entries.length} total
                </span>
              </div>

              {entries.length === 0 && (
                <p className="text-sm text-center py-6" style={{ color: "#737972" }}>
                  No entries yet. Write your first one!
                </p>
              )}

              {entries.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
                  className="rounded-2xl p-4 cursor-pointer transition-colors"
                  style={{
                    backgroundColor: expandedEntry === entry.id ? "#eae8e4" : "#efeeea",
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-semibold" style={{ color: "#4a654e" }}>
                      {entry.date}
                    </span>
                    <button
                      onClick={(e) => handleDelete(entry.id, e)}
                      className="text-xs font-medium px-2 py-0.5 rounded-full transition-colors hover:bg-red-100 hover:text-red-600"
                      style={{ color: "#737972" }}
                      aria-label="Delete entry"
                    >
                      delete
                    </button>
                  </div>

                  {/* +++ TITLE IN CARD +++ */}
                  <h4
                    className="text-sm font-semibold leading-snug mb-1"
                    style={{ color: "#1b1c1a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {entry.title}
                  </h4>
                  <div style={{ borderTop: "1px solid #d8d6d2" }} className="mb-2" />
                  {/* +++ END TITLE IN CARD +++ */}

                  <p
                    className={`text-sm leading-relaxed transition-all ${
                      expandedEntry === entry.id ? "" : "line-clamp-2"
                    }`}
                    style={{ color: "#424842" }}
                  >
                    {entry.body}
                  </p>

                  {entry.body.length > 120 && (
                    <span className="text-xs mt-1 block" style={{ color: "#4a654e" }}>
                      {expandedEntry === entry.id ? "Show less ↑" : "Read more ↓"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Journal;