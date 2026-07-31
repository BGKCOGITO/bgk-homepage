import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bgkcogito.co.kr"),
  title: {
    default: "BGK | 실용적인 AI 소프트웨어 기업",
    template: "%s | BGK",
  },
  description: "BGK는 반려동물 의료와 물류 현장의 문제를 AI와 소프트웨어로 해결하는 기업입니다. PAWU와 DELIVO를 개발합니다.",
  keywords: ["BGK", "비지케이", "PAWU", "DELIVO", "AI 소프트웨어", "SaaS", "동물병원 플랫폼", "택배 업무 관리"],
  authors: [{ name: "BGK" }],
  creator: "BGK",
  publisher: "BGK",
  alternates: { canonical: "/" },
  openGraph: {
    title: "BGK | 실용적인 AI 소프트웨어 기업",
    description: "현장의 문제를 기술로 해결하고, 유일한 가치를 만드는 BGK 공식 홈페이지",
    url: "https://bgkcogito.co.kr",
    siteName: "BGK",
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/images/bgk-gold.png", width: 1536, height: 1024, alt: "BGK Become Globally Known" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BGK | 실용적인 AI 소프트웨어 기업",
    description: "현장에서 작동하는 AI 소프트웨어를 만듭니다.",
    images: ["/images/bgk-gold.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
