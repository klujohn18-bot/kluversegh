"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-eyebrow",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          ".hero-line1",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.4"
        )
        .fromTo(
          ".hero-line2",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.5"
        )
        .fromTo(
          ".hero-sub",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden flex items-end"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#2E4036]/80 to-transparent" />

      {/* Secondary warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-20 md:pb-24">
        {/* Eyebrow */}
        <div className="hero-eyebrow flex items-center gap-3 mb-6">
          <span className="font-mono-data text-xs text-[#CC5833] tracking-[0.2em] uppercase">
            Ghana Scholarship Intelligence
          </span>
          <span className="block w-12 h-px bg-[#CC5833]/60" />
        </div>

        {/* Headline */}
        <h1 className="mb-6 leading-none">
          <span
            className="hero-line1 block font-jakarta font-800 text-[#F2F0E9] text-4xl md:text-6xl lg:text-7xl tracking-tight"
            style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            Your future funding is
          </span>
          <span
            className="hero-line2 block font-cormorant italic text-[#CC5833] text-6xl md:text-8xl lg:text-[9rem] leading-none"
            style={{ fontStyle: "italic", lineHeight: 0.95 }}
          >
            Waiting.
          </span>
        </h1>

        {/* Subline */}
        <p
          className="hero-sub font-jakarta text-[#F2F0E9]/70 text-base md:text-lg max-w-lg mb-10 leading-relaxed"
          style={{ fontWeight: 400 }}
        >
          Curated, verified scholarships for Ghanaian students — with real-time
          deadlines, tech-focused opportunities, and your personal document
          checklist.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <a href="#scholarships" className="hero-cta btn-magnetic btn-clay">
            <span className="btn-slide" />
            <span className="flex items-center gap-2">
              Search Scholarships Now <ArrowRight size={16} />
            </span>
          </a>
          <a href="#protocol" className="hero-cta btn-magnetic btn-ghost-light">
            <span className="btn-slide" />
            <span>How It Works</span>
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-14 flex flex-wrap gap-8">
          {[
            { value: "200+", label: "Active Scholarships" },
            { value: "98%", label: "Verified Sources" },
            { value: "∞", label: "Free Forever" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span
                className="font-mono-data text-2xl font-600 text-[#CC5833]"
                style={{ fontWeight: 600 }}
              >
                {stat.value}
              </span>
              <span className="font-jakarta text-xs text-[#F2F0E9]/50 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono-data text-[10px] text-[#F2F0E9] tracking-widest rotate-90">
          SCROLL
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#F2F0E9] to-transparent" />
      </div>
    </section>
  );
}
