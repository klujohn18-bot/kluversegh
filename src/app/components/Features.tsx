"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Card 1: Diagnostic Shuffler ───────────────────────── */
const DEADLINE_ITEMS = [
  { label: "MASTERCARD FOUNDATION", date: "DEC 15", daysLeft: 71, color: "#CC5833" },
  { label: "COMMONWEALTH SCHOLARSHIP", date: "JAN 10", daysLeft: 97, color: "#2E4036" },
  { label: "DAAD GHANA GRANT", date: "NOV 30", daysLeft: 56, color: "#8B6D4A" },
];

function ShufflerCard() {
  const [items, setItems] = useState(DEADLINE_ITEMS);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        const last = next.pop()!;
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-56">
      {items.map((item, i) => (
        <div
          key={item.label}
          className="absolute inset-x-0 rounded-[1.5rem] border border-[#2E4036]/10 bg-[#F2F0E9] shadow-md p-5 flex justify-between items-start transition-all"
          style={{
            top: `${i * 14}px`,
            zIndex: 3 - i,
            opacity: 1 - i * 0.25,
            transform: `scale(${1 - i * 0.03})`,
            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            boxShadow: i === 0 ? "0 8px 32px rgba(46,64,54,0.12)" : "none",
          }}
        >
          <div>
            <span className="font-mono-data text-[10px] tracking-widest text-[#1A1A1A]/40 uppercase">
              Deadline
            </span>
            <p className="font-jakarta font-700 text-sm text-[#1A1A1A] mt-1" style={{ fontWeight: 700 }}>
              {item.label}
            </p>
          </div>
          <div className="text-right">
            <span
              className="font-mono-data text-2xl font-600"
              style={{ color: item.color, fontWeight: 600 }}
            >
              {item.daysLeft}
            </span>
            <p className="font-mono-data text-[10px] text-[#1A1A1A]/40">DAYS LEFT</p>
            <p className="font-jakarta text-xs text-[#1A1A1A]/60 mt-1">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Card 2: Telemetry Typewriter ───────────────────────── */
const FEED_LINES = [
  "FETCHING: mastercard-foundation.gh → 200 OK",
  "VERIFIED: Commonwealth Scholarships — OPEN",
  "ALERT: DAAD deadline in 56 days",
  "NEW:  USAID Ghana Tech Grant — Added",
  "MATCH: Your profile → 12 scholarships found",
  "SYNC: Document checklist updated",
  "LIVE:  3 scholarships closing this week",
];

function TypewriterCard() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [partial, setPartial] = useState("");

  useEffect(() => {
    const target = FEED_LINES[currentLine];
    if (currentChar < target.length) {
      const t = setTimeout(() => {
        setPartial((p) => p + target[currentChar]);
        setCurrentChar((c) => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines((prev) => [...prev.slice(-5), partial]);
        setPartial("");
        setCurrentChar(0);
        setCurrentLine((l) => (l + 1) % FEED_LINES.length);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [currentChar, currentLine, partial]);

  return (
    <div className="bg-[#1A1A1A] rounded-[1.5rem] p-5 h-56 overflow-hidden flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-3">
        <span className="pulse-dot w-2 h-2 rounded-full bg-[#CC5833] inline-block" />
        <span className="font-mono-data text-[10px] text-[#CC5833] tracking-widest uppercase">
          Live Feed
        </span>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col justify-end gap-1">
        {lines.map((line, i) => (
          <p key={i} className="font-mono-data text-[10px] text-[#F2F0E9]/30 truncate">
            {line}
          </p>
        ))}
        <p className="font-mono-data text-[11px] text-[#CC5833]">
          {">"} {partial}
          <span className="cursor-blink">█</span>
        </p>
      </div>
    </div>
  );
}

/* ── Card 3: Cursor Protocol Scheduler ─────────────────── */
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const SEQUENCE = [1, 3, 5]; // Mon, Wed, Fri

function SchedulerCard() {
  const [activeDays, setActiveDays] = useState<number[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: -40, y: 50 });
  const [pressing, setPressing] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let step = 0;
    const run = () => {
      if (step < SEQUENCE.length) {
        const dayIdx = SEQUENCE[step];
        // Move cursor to day
        setCursorPos({ x: dayIdx * 38 + 12, y: 48 });
        setTimeout(() => {
          setPressing(dayIdx);
          setTimeout(() => {
            setPressing(null);
            setActiveDays((prev) => [...prev, dayIdx]);
            step++;
            setTimeout(run, 400);
          }, 300);
        }, 600);
      } else {
        // Move to save button
        setCursorPos({ x: 110, y: 110 });
        setTimeout(() => {
          setSaved(true);
          setTimeout(() => {
            // Reset
            setActiveDays([]);
            setSaved(false);
            step = 0;
            setCursorPos({ x: -40, y: 50 });
            setTimeout(run, 800);
          }, 2500);
        }, 700);
      }
    };
    const t = setTimeout(run, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative bg-[#F2F0E9] rounded-[1.5rem] border border-[#2E4036]/10 p-5 h-56 overflow-hidden">
      <p className="font-mono-data text-[10px] text-[#1A1A1A]/40 tracking-widest uppercase mb-4">
        Check-in Schedule
      </p>

      {/* Day grid */}
      <div className="flex gap-2 mb-6">
        {DAYS.map((d, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-xl flex items-center justify-center font-mono-data text-xs font-600 transition-all duration-200"
            style={{
              background: activeDays.includes(i)
                ? "#CC5833"
                : pressing === i
                ? "#2E4036"
                : "rgba(46,64,54,0.08)",
              color: activeDays.includes(i) || pressing === i ? "#F2F0E9" : "#1A1A1A",
              transform: pressing === i ? "scale(0.95)" : "scale(1)",
              fontWeight: 600,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Save button */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-jakarta text-xs font-600 transition-all duration-300"
        style={{
          background: saved ? "#CC5833" : "rgba(46,64,54,0.1)",
          color: saved ? "#F2F0E9" : "#2E4036",
          fontWeight: 600,
        }}
      >
        {saved ? "✓ Reminders Saved!" : "Save Reminders"}
      </div>

      {/* SVG Cursor */}
      <svg
        className="absolute pointer-events-none transition-all duration-500"
        style={{
          left: `${cursorPos.x + 16}px`,
          top: `${cursorPos.y + 16}px`,
          transition: "left 0.5s cubic-bezier(0.25,0.46,0.45,0.94), top 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
          opacity: cursorPos.x < 0 ? 0 : 1,
        }}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="#CC5833"
      >
        <path d="M4 0 L4 20 L9 15 L14 24 L17 22.5 L12 13.5 L20 13.5 Z" />
      </svg>
    </div>
  );
}

/* ── Section Wrapper ────────────────────────────────────── */
const FEATURES = [
  {
    label: "01 — Real-Time Deadlines",
    title: "Never miss a deadline again.",
    desc: "Live countdown timers for every scholarship. Automated alerts when deadlines shift. Your funding window, always in focus.",
    card: <ShufflerCard />,
  },
  {
    label: "02 — Curated Tech Scholarships",
    title: "Built for Ghana's tech generation.",
    desc: "STEM, software engineering, data science, AI — every opportunity verified and categorised for Ghanaian students.",
    card: <TypewriterCard />,
  },
  {
    label: "03 — Personal Checklist & Favourites",
    title: "Your documents. Your shortlist.",
    desc: "Per-scholarship document checklists that auto-populate. Bookmark your top picks and track completion status.",
    card: <SchedulerCard />,
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scholarships"
      ref={sectionRef}
      className="py-28 px-6 md:px-12 max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <div className="mb-16 flex flex-col gap-4">
        <span className="font-mono-data text-xs text-[#CC5833] tracking-[0.2em] uppercase">
          Why Kluversegh
        </span>
        <h2
          className="font-jakarta font-800 text-4xl md:text-5xl text-[#1A1A1A] leading-tight"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          Three tools that change
          <br />
          <span className="font-cormorant italic text-[#2E4036]" style={{ fontStyle: "italic" }}>
            everything.
          </span>
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((f) => (
          <div
            key={f.label}
            className="feature-card card-lift bg-[#F2F0E9] border border-[#2E4036]/10 rounded-[2rem] p-6 flex flex-col gap-6 shadow-sm"
          >
            {/* Interactive Widget */}
            <div className="overflow-hidden">{f.card}</div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <span className="font-mono-data text-[10px] text-[#CC5833] tracking-[0.15em] uppercase">
                {f.label}
              </span>
              <h3
                className="font-jakarta font-700 text-lg text-[#1A1A1A]"
                style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                {f.title}
              </h3>
              <p className="font-jakarta text-sm text-[#1A1A1A]/60 leading-relaxed" style={{ fontWeight: 400 }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
