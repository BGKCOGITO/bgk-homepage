"use client";

import { useEffect, useState } from "react";

const items = [
  ["회사소개", "#about"],
  ["서비스", "#services"],
  ["미래", "#future"],
  ["대표소개", "#founder"],
  ["비전", "#vision"],
  ["문의", "#contact"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="BGK 홈">
        <span className="brand-mark">BGK</span>
        <span className="brand-sub">BECOME GLOBALLY KNOWN</span>
      </a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="메뉴 열기" aria-expanded={open}>
        <span />
        <span />
      </button>
      <nav className={open ? "nav open" : "nav"}>
        {items.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
