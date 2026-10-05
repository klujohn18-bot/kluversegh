"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = sectionRef.current?.querySelectorAll(".manifesto-word");
      if (!words) return;

      gsap.fromTo(
        words,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );

      // Parallax texture
      gsap.to(".philosophy-texture", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const line1 = "Most scholarship platforms focus on: quantity over quality — overwhelming students with irrelevant noise.".split(" ");
  const line2 = ["We", "focus", "on:", "precision."].map((w, i) => ({
    word: w,
    accent: i === 3,
  }));

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative overflow-hidden py-32 px-6 md:px-12"
      style={{ background: "#1A1A1A" }}
    >
      {/* Texture */}
      <div
        className="philosophy-texture absolute inset-0 bg-cover bg-center opacity-[0.06]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1400&q=60')",
          transform: "scale(1.15)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <span className="font-mono-data text-xs text-[#CC5833]/80 tracking-[0.2em] uppercase block mb-10">
          Our Philosophy
        </span>

        {/* Neutral statement */}
        <p className="font-jakarta text-sm md:text-base text-[#F2F0E9]/40 mb-10 max-w-2xl leading-relaxed flex flex-wrap gap-[0.3em]" style={{ fontWeight: 400 }}>
          {line1.map((word, i) => (
            <span key={i} className="manifesto-word inline-block">
              {word}
            </span>
          ))}
        </p>

        {/* Power statement */}
        <p className="font-cormorant italic text-4xl md:text-6xl lg:text-7xl leading-tight text-[#F2F0E9] flex flex-wrap gap-[0.25em]" style={{ fontStyle: "italic" }}>
          {line2.map((item, i) => (
            <span
              key={i}
              className="manifesto-word inline-block"
              style={{ color: item.accent ? "#CC5833" : "#F2F0E9" }}
            >
              {item.word}
            </span>
          ))}
        </p>

        <p
          className="font-cormorant italic text-4xl md:text-6xl lg:text-7xl text-[#F2F0E9]/80 mt-4 leading-tight"
          style={{ fontStyle: "italic" }}
        >
          <span className="manifesto-word inline-block">Verified.</span>{" "}
          <span className="manifesto-word inline-block">Curated.</span>{" "}
          <span className="manifesto-word inline-block text-[#2E4036]">Ghana-first.</span>
        </p>

        {/* Divider */}
        <div className="mt-16 flex items-center gap-6">
          <div className="h-px flex-1 bg-[#F2F0E9]/10" />
          <span className="font-mono-data text-xs text-[#F2F0E9]/20 tracking-widest uppercase">
            Est. 2024 — Accra, Ghana
          </span>
          <div className="h-px flex-1 bg-[#F2F0E9]/10" />
        </div>
      </div>
    </section>
  );
}
