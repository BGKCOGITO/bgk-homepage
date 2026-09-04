"use client";

import { useEffect, type MouseEventHandler, type ReactNode } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type CtaEventName = "quote_click" | "kakao_click" | "phone_click" | "case_click";

type WorkcraftLandingCtaProps = {
  href: string;
  eventName: CtaEventName;
  className?: string;
  children: ReactNode;
  target?: "_blank";
  rel?: string;
  ariaLabel?: string;
};

function track(eventName: string, href: string) {
  try {
    window.gtag?.("event", `workcraft_landing_${eventName}`, {
      event_category: "workcraft_conversion_landing",
      event_label: href,
      page_path: window.location.pathname,
    });
  } catch (error) {
    console.warn("WorkCraft landing tracking failed", error);
  }
}

export function WorkcraftLandingTracker() {
  useEffect(() => {
    track("view", window.location.href);
  }, []);

  return null;
}

export default function WorkcraftLandingCta({
  href,
  eventName,
  className,
  children,
  target,
  rel,
  ariaLabel,
}: WorkcraftLandingCtaProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = () => track(eventName, href);

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
