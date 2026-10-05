"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── SVG Animation 1: Concentric Circles ───────────────── */
function ConcentricCircles() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-40">
      <circle cx="60" cy="60" r="50" fill="none" stroke="#CC5833" strokeWidth="0.8" className="rotate-slow" style={{ transformOrigin: "60px 60px" }} />
      <circle cx="60" cy="60" r="36" fill="none" stroke="#CC5833" strokeWidth="1.2" className="rotate-slow-reverse" style={{ transformOrigin: "60px 60px" }} />
      <circle cx="60" cy="60" r="22" fill="none" stroke="#2E4036" strokeWidth="1.5" className="rotate-slow" style={{ transformOrigin: "60px 60px" }} />
      <circle cx="60" cy="60" r="8" fill="#CC5833" opacity="0.6" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <circle
          key={angle}
          cx={60 + 50 * Math.cos((angle * Math.PI) / 180)}
          cy={60 + 50 * Math.sin((angle * Math.PI) / 180)}
          r="2.5"
          fill="#CC5833"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

/* ── SVG Animation 2: Scanning Laser Grid ──────────────── */
function ScanGrid() {
  const COLS = 7;
  const ROWS = 4;
  return (
    <svg width="240" height="120" viewBox="0 0 240 120" className="opacity-50">
      {/* Grid dots */}
      {Array.from({ length: ROWS }, (_, r) =>
        Array.from({ length: COLS }, (_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={20 + c * 34}
            cy={20 + r * 28}
            r="2"
            fill="#F2F0E9"
            opacity="0.3"
          />
        ))
      )}
      {/* Scan line */}
      <rect className="scan-line" x="0" y="0" width="3" height="120" fill="#CC5833" opacity="0.8" rx="1.5" />
    </svg>
  );
}

/* ── SVG Animation 3: EKG Waveform ─────────────────────── */
function EKGWave() {
  return (
    <svg width="240" height="80" viewBox="0 0 240 80" className="opacity-60">
      <path
        className="ekg-path"
        d="M0,40 L20,40 L30,40 L35,10 L40,65 L45,40 L60,40 L70,40 L75,20 L80,55 L85,40 L100,40 L110,40 L115,15 L120,60 L125,40 L140,40 L150,40 L155,22 L160,58 L165,40 L180,40 L190,40 L195,12 L200,63 L205,40 L240,40"
        fill="none"
        stroke="#CC5833"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="200" cy="40" r="3" fill="#CC5833" opacity="0.8">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ── Protocol Cards Data ─────────────────────────────────── */
const STEPS = [
  {
    num: "001",
    title: "Discover Your Match",
    desc: "Our algorithm cross-references your course, year, and nationality against 200+ verified scholarships — surfacing only what truly applies to you.",
    animation: <ConcentricCircles />,
    bg: "#F2F0E9",
    textColor: "#1A1A1A",
  },
  {
    num: "002",
    title: "Track Every Deadline",
    desc: "Real-time countdown timers and push alerts keep you ahead of every closing date. Never scramble at the last minute again.",
    animation: <ScanGrid />,
    bg: "#2E4036",
    textColor: "#F2F0E9",
  },
  {
    num: "003",
    title: "Apply With Confidence",
    desc: "Per-scholarship document checklists guide you from start to submission. Favourite, compare, and organise your entire pipeline in one place.",
    animation: <EKGWave />,
    bg: "#1A1A1A",
    textColor: "#F2F0E9",
  },
];

export default function Protocol() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".protocol-card");
      if (!cards) return;

      cards.forEach((card, i) => {
        if (i === 0) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () => {
            gsap.to(cards[i - 1], {
              scale: 0.92,
              filter: "blur(4px)",
              opacity: 0.45,
              duration: 0.6,
              ease: "power2.inOut",
            });
          },
          onLeaveBack: () => {
            gsap.to(cards[i - 1], {
              scale: 1,
              filter: "blur(0px)",
              opacity: 1,
              duration: 0.5,
              ease: "power2.inOut",
            });
          },
        });
      });

      gsap.fromTo(
        ".protocol-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
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
      id="protocol"
      ref={sectionRef}
      className="py-28 px-6 md:px-12 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="mb-16 flex flex-col gap-4">
        <span className="font-mono-data text-xs text-[#CC5833] tracking-[0.2em] uppercase">
          How It Works
        </span>
        <h2
          className="font-jakarta font-800 text-4xl md:text-5xl text-[#1A1A1A]"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          Three steps to your
          <br />
          <span className="font-cormorant italic text-[#2E4036]" style={{ fontStyle: "italic" }}>
            scholarship.
          </span>
        </h2>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-6">
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="protocol-card rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 transition-all duration-300"
            style={{ background: step.bg }}
          >
            <div className="flex flex-col gap-4 max-w-lg">
              <span
                className="font-mono-data text-xs tracking-[0.2em] uppercase"
                style={{ color: step.textColor, opacity: 0.4 }}
              >
                Step {step.num}
              </span>
              <h3
                className="font-jakarta font-800 text-2xl md:text-3xl"
                style={{ fontWeight: 800, color: step.textColor, letterSpacing: "-0.02em" }}
              >
                {step.title}
              </h3>
              <p
                className="font-jakarta text-sm leading-relaxed"
                style={{ color: step.textColor, opacity: 0.6, fontWeight: 400 }}
              >
                {step.desc}
              </p>
            </div>
            <div className="flex-shrink-0">{step.animation}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
