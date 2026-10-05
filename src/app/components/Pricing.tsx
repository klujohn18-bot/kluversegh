"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    name: "Essential",
    tagline: "Start your search",
    price: "Free",
    period: "forever",
    features: [
      "Browse all 200+ scholarships",
      "Basic deadline tracker",
      "3 saved favourites",
      "Email alerts (weekly digest)",
      "Public document checklist",
    ],
    cta: "Get Started Free",
    featured: false,
  },
  {
    name: "Performance",
    tagline: "For serious applicants",
    price: "GH₵ 49",
    period: "/ month",
    features: [
      "Everything in Essential",
      "Unlimited saved favourites",
      "Real-time deadline alerts",
      "Personal document vault",
      "AI match scoring",
      "Priority scholarship updates",
    ],
    cta: "Search Scholarships Now",
    featured: true,
  },
  {
    name: "Enterprise",
    tagline: "For schools & NGOs",
    price: "Custom",
    period: "pricing",
    features: [
      "Everything in Performance",
      "Bulk student management",
      "Dedicated advisor dashboard",
      "API access",
      "Custom scholarship pipeline",
      "White-label option",
    ],
    cta: "Contact Us",
    featured: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
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
      id="pricing"
      ref={sectionRef}
      className="py-28 px-6 md:px-12 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="mb-16 flex flex-col gap-4">
        <span className="font-mono-data text-xs text-[#CC5833] tracking-[0.2em] uppercase">
          Membership
        </span>
        <h2
          className="font-jakarta font-800 text-4xl md:text-5xl text-[#1A1A1A]"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          Pick your plan.
          <br />
          <span className="font-cormorant italic text-[#2E4036]" style={{ fontStyle: "italic" }}>
            Start free.
          </span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`pricing-card rounded-[2rem] p-8 flex flex-col gap-6 card-lift border transition-all duration-300 ${
              tier.featured
                ? "pricing-featured border-transparent"
                : "bg-[#F2F0E9] border-[#2E4036]/10"
            }`}
          >
            {/* Top */}
            <div className="flex flex-col gap-1">
              {tier.featured && (
                <span className="font-mono-data text-[10px] text-[#CC5833] tracking-widest uppercase mb-2">
                  ★ Most Popular
                </span>
              )}
              <h3
                className="font-jakarta font-800 text-xl"
                style={{
                  fontWeight: 800,
                  color: tier.featured ? "#F2F0E9" : "#1A1A1A",
                }}
              >
                {tier.name}
              </h3>
              <p
                className="font-jakarta text-sm"
                style={{ color: tier.featured ? "#F2F0E9" : "#1A1A1A", opacity: 0.6, fontWeight: 400 }}
              >
                {tier.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1">
              <span
                className="font-jakarta font-800 text-4xl"
                style={{ fontWeight: 800, color: tier.featured ? "#CC5833" : "#2E4036" }}
              >
                {tier.price}
              </span>
              <span
                className="font-mono-data text-xs"
                style={{ color: tier.featured ? "#F2F0E9" : "#1A1A1A", opacity: 0.5 }}
              >
                {tier.period}
              </span>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check
                    size={14}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: tier.featured ? "#CC5833" : "#2E4036" }}
                  />
                  <span
                    className="font-jakarta text-sm"
                    style={{ color: tier.featured ? "#F2F0E9" : "#1A1A1A", opacity: 0.75, fontWeight: 400 }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            {tier.featured ? (
              <a href="#scholarships" className="btn-magnetic btn-clay mt-auto text-center">
                <span className="btn-slide" />
                <span>{tier.cta}</span>
              </a>
            ) : (
              <a href="#scholarships" className="btn-magnetic btn-moss-outline mt-auto text-center">
                <span className="btn-slide" />
                <span>{tier.cta}</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
