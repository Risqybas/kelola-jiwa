<!DOCTYPE html><html class="light" lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Digital Sanctuary - Daily Tracker</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@500;600;700;800&amp;display=swap" rel="stylesheet">
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-secondary": "#ffffff",
                    "surface-container-highest": "#e4e2de",
                    "on-tertiary-container": "#3e3726",
                    "tertiary-fixed-dim": "#d1c5ae",
                    "on-error-container": "#93000a",
                    "tertiary": "#665e4b",
                    "primary": "#4a654e",
                    "secondary": "#4f6168",
                    "on-primary-fixed-variant": "#334d38",
                    "on-tertiary-fixed-variant": "#4d4634",
                    "inverse-on-surface": "#f2f0ed",
                    "error-container": "#ffdad6",
                    "primary-container": "#8ba88e",
                    "on-primary": "#ffffff",
                    "primary-fixed": "#cceace",
                    "surface-bright": "#fbf9f5",
                    "on-tertiary": "#ffffff",
                    "surface-variant": "#e4e2de",
                    "on-primary-fixed": "#07200f",
                    "outline": "#737972",
                    "on-surface-variant": "#424842",
                    "surface": "#fbf9f5",
                    "on-secondary-fixed": "#0c1e23",
                    "on-primary-container": "#233d29",
                    "surface-container-high": "#eae8e4",
                    "on-secondary-fixed-variant": "#384a50",
                    "secondary-fixed": "#d2e6ed",
                    "surface-container-low": "#f5f3ef",
                    "surface-tint": "#4a654e",
                    "on-background": "#1b1c1a",
                    "on-secondary-container": "#55676e",
                    "inverse-primary": "#b0ceb2",
                    "on-error": "#ffffff",
                    "primary-fixed-dim": "#b0ceb2",
                    "on-surface": "#1b1c1a",
                    "background": "#fbf9f5",
                    "surface-container": "#efeeea",
                    "inverse-surface": "#30312e",
                    "surface-container-lowest": "#ffffff",
                    "outline-variant": "#c2c8c0",
                    "secondary-container": "#d2e6ed",
                    "tertiary-fixed": "#ede1c9",
                    "tertiary-container": "#aaa08a",
                    "surface-dim": "#dbdad6",
                    "secondary-fixed-dim": "#b6cad1",
                    "error": "#ba1a1a",
                    "on-tertiary-fixed": "#211b0c"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "container-padding-mobile": "20px",
                    "container-padding-desktop": "40px",
                    "base": "8px",
                    "stack-gap": "16px",
                    "section-gap": "32px"
            },
            "fontFamily": {
                    "body-md": ["Be Vietnam Pro"],
                    "headline-md": ["Plus Jakarta Sans"],
                    "label-sm": ["Be Vietnam Pro"],
                    "display-lg": ["Plus Jakarta Sans"],
                    "headline-lg-mobile": ["Plus Jakarta Sans"],
                    "label-md": ["Be Vietnam Pro"],
                    "headline-lg": ["Plus Jakarta Sans"],
                    "body-lg": ["Be Vietnam Pro"]
            },
            "fontSize": {
                    "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "500"}],
                    "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "500"}],
                    "display-lg": ["40px", {"lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600"}],
                    "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                    "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            vertical-align: middle;
        }
        .mood-bubble-active {
            animation: pulse-soft 3s infinite ease-in-out;
        }
        @keyframes pulse-soft {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(74, 101, 78, 0.2); }
            50% { transform: scale(1.05); box-shadow: 0 0 20px 5px rgba(74, 101, 78, 0.1); }
        }
        .glass-card {
            backdrop-filter: blur(8px);
            background: rgba(170, 160, 138, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #c2c8c0;
            border-radius: 10px;
        }
        body {
            overscroll-behavior: none;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>
<body class="bg-background text-on-background font-body-md min-h-screen pb-24">
<!-- TopAppBar -->
<header class="w-full top-0 sticky bg-surface dark:bg-surface-dim shadow-[0_20px_20px_-5px_rgba(74,101,78,0.08)] z-50">
<div class="flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop h-16 w-full">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-container">
<img class="w-full h-full object-cover" data-alt="A professional, gentle portrait of a diverse individual smiling softly at the camera. The background is a blurred domestic sanctuary with warm sunlight and soft sage green walls, reflecting a calm and supportive lifestyle aesthetic. The lighting is high-key and flattering, emphasizing peace and mental clarity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrWf3IdUVI3aC1BIUPKGVZdiHRXBY1RXnpRmd2xtnNKvbg0JIccVktns9CoB-XA0tOo0RR45r-grar89Y89rudq_r4G3h_fUFznLf48XuEvkUbePPVSL2A_GhqaUcMwkoc9vK1u0ne-i1qyqTSTJPy0ii4LcIkl-JirtsFH9clZxKe6TQv6m2dBLTSVMPO_WQeS8jSAL7dj0VYVlVkzR-k5SW9iLPLiSEK5gU2984-a-YEHpkx4qT2DUj6BbV7CD-xos4JuR-5qPYo">
</div>
<h1 class="font-headline-md text-headline-md-mobile md:text-headline-md text-primary dark:text-primary-fixed-dim">Digital Sanctuary</h1>
</div>
<button class="p-2 rounded-full hover:bg-primary-container/20 transition-colors active:scale-95 text-on-surface-variant">
<span class="material-symbols-outlined">settings</span>
</button>
</div>
</header>
<main class="max-w-[1200px] mx-auto px-container-padding-mobile md:px-container-padding-desktop pt-8 space-y-section-gap">
<!-- Header Section -->
<section class="space-y-2">
<h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">How are you feeling today?</h2>
<p class="text-body-md text-on-surface-variant opacity-80">Take a moment to check in with your inner sanctuary.</p>
</section>
<!-- Mood Selector (Bento Style Layout) -->
<section class="grid grid-cols-2 md:grid-cols-4 gap-4">
<!-- Mood: Calm -->
<button class="mood-card group flex flex-col items-center justify-center p-6 rounded-[2rem] bg-surface-container transition-all duration-300 hover:shadow-lg" onclick="selectMood(this)">
<div class="w-16 h-16 mb-4 rounded-full bg-secondary-fixed flex items-center justify-center transition-transform group-hover:scale-110">
<span class="material-symbols-outlined text-4xl text-on-secondary-fixed-variant">filter_drama</span>
</div>
<span class="font-label-md text-label-md text-on-surface-variant">Calm</span>
</button>
<!-- Mood: Anxious -->
<button class="mood-card group flex flex-col items-center justify-center p-6 rounded-[2rem] bg-surface-container transition-all duration-300 hover:shadow-lg" onclick="selectMood(this)">
<div class="w-16 h-16 mb-4 rounded-full bg-error-container flex items-center justify-center transition-transform group-hover:scale-110">
<span class="material-symbols-outlined text-4xl text-on-error-container">bolt</span>
</div>
<span class="font-label-md text-label-md text-on-surface-variant">Anxious</span>
</button>
<!-- Mood: Stable -->
<button class="mood-card group flex flex-col items-center justify-center p-6 rounded-[2rem] bg-surface-container transition-all duration-300 hover:shadow-lg" onclick="selectMood(this)">
<div class="w-16 h-16 mb-4 rounded-full bg-primary-fixed flex items-center justify-center transition-transform group-hover:scale-110">
<span class="material-symbols-outlined text-4xl text-on-primary-fixed-variant">balance</span>
</div>
<span class="font-label-md text-label-md text-on-surface-variant">Stable</span>
</button>
<!-- Mood: Low -->
<button class="mood-card group flex flex-col items-center justify-center p-6 rounded-[2rem] bg-surface-container transition-all duration-300 hover:shadow-lg" onclick="selectMood(this)">
<div class="w-16 h-16 mb-4 rounded-full bg-tertiary-fixed flex items-center justify-center transition-transform group-hover:scale-110">
<span class="material-symbols-outlined text-4xl text-on-tertiary-fixed-variant">bedtime</span>
</div>
<span class="font-label-md text-label-md text-on-surface-variant">Low</span>
</button>
</section>
<!-- Main Content Area: Sleep and Summary -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
<!-- Sleep Tracker (Left Column) -->
<section class="lg:col-span-5 space-y-stack-gap">
<div class="p-8 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/30 shadow-sm">
<div class="flex items-center justify-between mb-8">
<div>
<h3 class="font-headline-md text-headline-md text-on-surface">Sleep History</h3>
<p class="text-label-sm text-on-surface-variant">Total duration last night</p>
</div>
<span class="material-symbols-outlined text-primary text-3xl">nights_stay</span>
</div>
<div class="space-y-8">
<!-- Sleep Slider Visual -->
<div class="relative pt-12 pb-8">
<div class="h-4 w-full bg-secondary-container rounded-full relative">
<div class="absolute left-0 top-0 h-4 bg-secondary rounded-full" id="sleepProgress" style="width: 70%"></div>
<div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 bg-white border-4 border-secondary rounded-full shadow-lg flex items-center justify-center transition-all cursor-pointer" id="sleepThumb" style="left: 70%">
<span class="material-symbols-outlined text-secondary text-sm">spark</span>
</div>
</div>
<div class="flex justify-between mt-4 text-label-sm text-on-surface-variant opacity-60">
<span>0h</span>
<span>12h</span>
</div>
</div>
<!-- Manual Input Fields -->
<div class="grid grid-cols-2 gap-4">
<div class="space-y-2">
<label class="font-label-md text-label-md px-1">Hours</label>
<input class="w-full h-14 rounded-2xl bg-white border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 text-center text-body-lg font-semibold" type="number" value="7">
</div>
<div class="space-y-2">
<label class="font-label-md text-label-md px-1">Minutes</label>
<input class="w-full h-14 rounded-2xl bg-white border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 text-center text-body-lg font-semibold" type="number" value="30">
</div>
</div>
</div>
</div>
</section>
<!-- Daily Summary Card (Right Column) -->
<section class="lg:col-span-7">
<div class="h-full glass-card p-8 rounded-[2.5rem] border border-white/40 flex flex-col relative overflow-hidden">
<!-- Background Shader Effect -->
<div class="absolute inset-0 -z-10 opacity-20">

</div>
<div class="flex items-start justify-between mb-6">
<div class="space-y-1">
<h3 class="font-headline-md text-headline-md text-on-tertiary-container">Daily Summary</h3>
<p class="text-label-md text-on-tertiary-container opacity-70">Monday, Oct 23</p>
</div>
<div class="flex gap-2">
<div class="p-2 rounded-xl bg-white/50"><span class="material-symbols-outlined text-primary">calendar_today</span></div>
</div>
</div>
<div class="space-y-6 flex-grow">
<div class="flex items-center gap-4 p-4 rounded-2xl bg-white/40 border border-white/50">
<div class="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary-fixed-variant">trending_up</span>
</div>
<div>
<p class="text-label-sm text-on-tertiary-container font-bold">Insight</p>
<p class="text-body-md text-on-surface-variant">Your mood has been stable for 4 days. Keep following your morning routine.</p>
</div>
</div>
<div class="space-y-4">
<h4 class="font-label-md text-label-md text-on-tertiary-container">Today's Notes</h4>
<textarea class="w-full min-h-[160px] p-6 rounded-3xl bg-white/30 border-transparent focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 text-body-md resize-none placeholder:text-on-surface-variant/40 transition-all" placeholder="How was your day? Write anything that comes to mind..."></textarea>
</div>
</div>
<div class="mt-8">
<button class="w-full py-4 rounded-full bg-primary text-on-primary font-label-md flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
<span>Save Entry</span>
<span class="material-symbols-outlined">check_circle</span>
</button>
</div>
</div>
</section>
</div>
<!-- Supportive Visual Section -->
<section class="pb-8">
<div class="w-full h-48 rounded-[2.5rem] relative overflow-hidden group">
<img class="w-full h-full object-cover" data-alt="A serene landscape featuring soft, rolling hills in various shades of sage green and muted blue under a misty, golden sunrise. The style is minimalist and painterly, evoking a deep sense of tranquility and emotional grounding. No harsh lines or bright colors, maintaining the design system's low-arousal atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYa4ZXT0E7RYGfG7ctQG7apqp-ILRoykJYCZeQK0wSksB8f8nBtXTMWAC-0gTQTz6lUfi-Yt8xk0Hs98R1iBSJQ_EbubHWcK9WhmhBgrJxgdLZM3lNys8GaKkX_flJ-CgduZUB6iw63tbqu-Tcru7FPdfnn1gysbSuZXK5C4jaP1dgO0t3lKOWBaFRDo7JtTZMvhC8JD5e2oc1epzFzk2vqFPIpCspdA9SvlXRq_7XfHVRQoOP_ue6X1RgZjRiazrzaLYIJxl4S-WW">
<div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8">
<p class="text-white font-headline-md italic opacity-90">"Peace is not the absence of storm, but the calm in the center of it."</p>
</div>
</div>
</section>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container-low dark:bg-surface-container-lowest shadow-[0_-4px_20px_-5px_rgba(74,101,78,0.08)]">
<div class="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pt-2 pb-6">
<!-- Tracker Tab (Active) -->
<a class="flex flex-col items-center justify-center bg-primary-container dark:bg-on-primary-fixed-variant text-on-primary-container dark:text-primary-fixed rounded-full px-5 py-1 transition-all duration-300 ease-out active:scale-90" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">mood</span>
<span class="font-label-md text-label-md">Tracker</span>
</a>
<!-- Meds Tab -->
<a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant opacity-70 hover:opacity-100 transition-all active:scale-90" href="#">
<span class="material-symbols-outlined">pill</span>
<span class="font-label-md text-label-md">Meds</span>
</a>
<!-- Journal Tab -->
<a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant opacity-70 hover:opacity-100 transition-all active:scale-90" href="#">
<span class="material-symbols-outlined">edit_note</span>
<span class="font-label-md text-label-md">Journal</span>
</a>
<!-- Safety Tab -->
<a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant opacity-70 hover:opacity-100 transition-all active:scale-90" href="#">
<span class="material-symbols-outlined">emergency_share</span>
<span class="font-label-md text-label-md">Safety</span>
</a>
</div>
</nav>
<script>
        function selectMood(element) {
            // Remove active state from all
            document.querySelectorAll('.mood-card').forEach(card => {
                card.classList.remove('mood-bubble-active', 'bg-primary-container/20', 'border-primary/20');
                card.classList.add('bg-surface-container');
            });
            
            // Add active state to clicked
            element.classList.add('mood-bubble-active', 'bg-primary-container/20', 'border-primary/20');
            element.classList.remove('bg-surface-container');
            
            // Haptic feedback simulation
            if (window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(10);
            }
        }

        // Simple Sleep Slider interaction logic
        const thumb = document.getElementById('sleepThumb');
        const progress = document.getElementById('sleepProgress');
        let isDragging = false;

        thumb.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const slider = thumb.parentElement;
            const rect = slider.getBoundingClientRect();
            let pos = (e.clientX - rect.left) / rect.width;
            pos = Math.max(0, Math.min(1, pos));
            thumb.style.left = `${pos * 100}%`;
            progress.style.width = `${pos * 100}%`;
            
            // Update the hour input based on percentage (0-12 range)
            const hours = Math.floor(pos * 12);
            const minutes = Math.floor((pos * 12 % 1) * 60);
            document.querySelector('input[type="number"]:first-of-type').value = hours;
            document.querySelector('input[type="number"]:last-of-type').value = minutes;
        });

        // Touch support for slider
        thumb.addEventListener('touchstart', () => isDragging = true);
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            const slider = thumb.parentElement;
            const rect = slider.getBoundingClientRect();
            let pos = (touch.clientX - rect.left) / rect.width;
            pos = Math.max(0, Math.min(1, pos));
            thumb.style.left = `${pos * 100}%`;
            progress.style.width = `${pos * 100}%`;
            
            const hours = Math.floor(pos * 12);
            const minutes = Math.floor((pos * 12 % 1) * 60);
            document.querySelectorAll('input[type="number"]')[0].value = hours;
            document.querySelectorAll('input[type="number"]')[1].value = minutes;
        });
    </script>
</body></html>