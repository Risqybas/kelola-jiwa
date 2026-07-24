# Kelola Jiwa — Bipolar & Mood Tracker

> Track your mood. Own your story. Never face a crisis alone.

---

## Overview

**Kelola Jiwa** is a mental health web application built for individuals living with bipolar disorder and other psychological conditions. It gives users the tools to monitor emotional patterns, express themselves through private journaling, and trigger automatic emergency responses when their mood hits a critical low — all within a single, accessible platform.

The name *Kelola Jiwa* comes from Indonesian, meaning **"Manage the Soul"** — a reflection of the app's core belief that mental wellness is not about suppressing emotions, but understanding and navigating them with intention.

---

## Problem Statement

People with bipolar disorder and mood-related conditions face three recurring challenges:

1. **Poor self-awareness** — Mood shifts often go unnoticed until they escalate into a full episode.
2. **No safe outlet** — Not everyone is ready or able to open up to the people around them.
3. **Delayed crisis response** — When someone is at their lowest, reaching out for help can feel impossible.

Kelola Jiwa addresses all three — proactively, not reactively.

---

## Core Features

### Mood Tracker
Log your emotional state daily using a structured mood scale. An interactive chart visualizes mood trends over time, helping users and their support network identify patterns before they escalate.

### Online Journal
A private, timestamped journal space for users to write freely without judgment. Each entry is linked to the mood data of the same day, building a richer emotional record that can be revisited and reflected upon.

### Emergency Contact Automation
The most critical feature of Kelola Jiwa: when a user's mood drops to a predefined critical threshold, the system **automatically notifies their registered emergency contacts** — no manual action required from the user. Fast, reliable, and potentially life-saving.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Styling | Tailwind CSS |
| Backend *(planned)* | Node.js |
| Database *(planned)* | TBD |

> **Note:** Backend development with Node.js is currently in the planning phase. Active development is focused on the frontend.

---

## Getting Started

### Prerequisites
- Node.js >= 18.x
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Risqybas/kelola-jiwa.git

# Navigate into the project directory
cd kelola-jiwa

# Install dependencies
npm install

# Start the development server
npm run dev
```

App runs at `http://localhost:5173` (Vite default) or `http://localhost:3000`.

---


## 🗺️ Roadmap

- [x] Project setup & Tailwind configuration
- [x] Mood tracker UI components
- [ ] Journaling module with rich text support
- [ ] Mood chart & data visualization
- [ ] Node.js backend & REST API
- [ ] User authentication
- [ ] Emergency contact automation module
- [ ] Real-time notifications (push / email / WhatsApp)
- [ ] Companion dashboard for family & caregivers

---

## Contributing

Contributions are welcome. Open an **issue** to discuss features or bugs, then submit a **pull request** with a clear description of your changes.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built with for those who are still fighting — you are not alone.</p>
