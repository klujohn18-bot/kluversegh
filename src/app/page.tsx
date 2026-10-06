"use client";
import dynamic from "next/dynamic";

// Dynamically import all animated components with ssr:false
// This prevents hydration mismatches from GSAP, intervals, and live state
const Navbar     = dynamic(() => import("./components/Navbar"),     { ssr: false });
const Hero       = dynamic(() => import("./components/Hero"),       { ssr: false });
const Features   = dynamic(() => import("./components/Features"),   { ssr: false });
const Philosophy = dynamic(() => import("./components/Philosophy"), { ssr: false });
const Protocol   = dynamic(() => import("./components/Protocol"),   { ssr: false });
const Pricing    = dynamic(() => import("./components/Pricing"),    { ssr: false });
const Footer     = dynamic(() => import("./components/Footer"),     { ssr: false });

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <Footer />
    </main>
  );
}
