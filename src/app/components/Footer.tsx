"use client";
import { GitBranch, X, Mail } from "lucide-react";

const NAV_COLS = [
  {
    title: "Scholarships",
    links: ["Browse All", "Tech & STEM", "Postgraduate", "Undergraduate", "Diaspora Funds"],
  },
  {
    title: "Platform",
    links: ["How It Works", "Deadline Tracker", "Document Vault", "Match Score", "API Access"],
  },
  {
    title: "Company",
    links: ["About Us", "Blog", "Careers", "Press", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative mt-8 rounded-t-[4rem] px-6 md:px-16 pt-16 pb-10"
      style={{ background: "#1A1A1A" }}
    >
      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
        {/* Brand column */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div>
            <span
              className="font-jakarta font-800 text-2xl text-[#F2F0E9]"
              style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
            >
              Kluve<span style={{ color: "#CC5833" }}>rsegh</span>
            </span>
            <p className="font-cormorant italic text-[#F2F0E9]/40 text-lg mt-1" style={{ fontStyle: "italic" }}>
              Ghana's scholarship intelligence platform.
            </p>
          </div>
          <p className="font-jakarta text-sm text-[#F2F0E9]/40 leading-relaxed max-w-xs" style={{ fontWeight: 400 }}>
            Helping Ghanaian students find, track, and apply for scholarships — with zero noise and maximum precision.
          </p>

          {/* Social */}
          <div className="flex items-center gap-4">
            {[
              { Icon: X, href: "#" },
              { Icon: GitBranch, href: "#" },
              { Icon: Mail, href: "mailto:hello@kluversegh.com" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 rounded-full border border-[#F2F0E9]/10 flex items-center justify-center text-[#F2F0E9]/40 transition-all duration-300 hover:border-[#CC5833] hover:text-[#CC5833] hover:-translate-y-px"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          {/* System status */}
          <div className="flex items-center gap-3 mt-2">
            <span
              className="sys-dot w-2 h-2 rounded-full bg-green-400 inline-block"
              style={{ boxShadow: "0 0 0 0 rgba(74,222,128,0.6)" }}
            />
            <span className="font-mono-data text-[11px] text-green-400/70 tracking-widest uppercase">
              System Operational
            </span>
          </div>
        </div>

        {/* Nav columns */}
        {NAV_COLS.map((col) => (
          <div key={col.title} className="flex flex-col gap-4">
            <span className="font-mono-data text-[10px] text-[#F2F0E9]/30 tracking-[0.2em] uppercase">
              {col.title}
            </span>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-jakarta text-sm text-[#F2F0E9]/50 hover:text-[#F2F0E9] transition-all duration-200 hover:-translate-y-px inline-block"
                    style={{ fontWeight: 400 }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-[#F2F0E9]/8">
        <span className="font-mono-data text-[11px] text-[#F2F0E9]/25 tracking-wide">
          © 2024 Kluversegh. All rights reserved.
        </span>
        <div className="flex items-center gap-6">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
            <a
              key={item}
              href="#"
              className="font-mono-data text-[11px] text-[#F2F0E9]/25 hover:text-[#F2F0E9]/60 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
