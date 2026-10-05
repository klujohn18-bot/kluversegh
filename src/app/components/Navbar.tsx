"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Scholarships", href: "#scholarships" },
  { label: "How It Works", href: "#protocol" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#philosophy" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.querySelector("#hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 px-4">
      <div
        ref={navRef}
        className={`flex items-center justify-between gap-8 px-5 py-3 rounded-[9999px] w-full max-w-5xl transition-all duration-500 ${
          scrolled
            ? "bg-[#F2F0E9]/80 backdrop-blur-xl border border-[#2E4036]/20 shadow-lg shadow-[#2E4036]/10"
            : "bg-transparent border border-white/10"
        }`}
      >
        {/* Logo */}
        <a
          href="#hero"
          className={`font-jakarta font-800 text-lg tracking-tight transition-colors duration-500 ${
            scrolled ? "text-[#2E4036]" : "text-[#F2F0E9]"
          }`}
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          Kluve<span style={{ color: "#CC5833" }}>rsegh</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`nav-link font-jakarta text-sm font-500 transition-colors duration-500 ${
                scrolled ? "text-[#1A1A1A]/70" : "text-[#F2F0E9]/80"
              }`}
              style={{ fontWeight: 500 }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#scholarships" className="btn-magnetic btn-clay hidden md:inline-flex" style={{ padding: "0.6rem 1.4rem", fontSize: "0.82rem" }}>
          <span className="btn-slide" />
          <span>Search Now</span>
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-1 transition-colors ${scrolled ? "text-[#2E4036]" : "text-[#F2F0E9]"}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-[72px] left-4 right-4 bg-[#F2F0E9]/95 backdrop-blur-xl border border-[#2E4036]/20 rounded-[2rem] p-6 shadow-2xl md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link font-jakarta text-base font-500 text-[#1A1A1A]/80"
                style={{ fontWeight: 500 }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#scholarships" className="btn-magnetic btn-clay mt-2 text-center" onClick={() => setMenuOpen(false)}>
              <span className="btn-slide" />
              <span>Search Scholarships Now</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
