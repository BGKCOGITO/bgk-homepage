"use client";

import { useEffect, useState } from "react";

const items = [
  ["회사소개", "#about"],
  ["사업", "#services"],
  ["WORKCRAFT", "/business"],
  ["진행방식", "#principles"],
  ["대표소개", "#founder"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="shell header-inner">
        <a className="brand" href="/#top" aria-label="BGK 홈">
          <span className="brand-mark">BGK</span>
          <span className="brand-sub">BECOME GLOBALLY KNOWN</span>
        </a>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="메뉴 열기" aria-expanded={open}>
          <span />
          <span />
        </button>
        <nav className={open ? "site-nav open" : "site-nav"}>
          {items.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="nav-cta" href="/business" onClick={() => setOpen(false)}>WORKCRAFT 보기</a>
        </nav>
      </div>
    </header>
  );
}
