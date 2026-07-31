import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bgkcogito.co.kr"),
  title: { default: "BGK | 현장에서 작동하는 AI 소프트웨어", template: "%s | BGK" },
  description: "BGK는 반려동물 의료와 물류 현장의 문제를 AI와 소프트웨어로 해결하는 기업입니다. PAWU와 DELIVO를 개발합니다.",
  keywords: ["BGK", "비지케이", "PAWU", "DELIVO", "AI 소프트웨어", "SaaS", "동물병원 플랫폼", "택배 업무 관리", "업무 자동화"],
  authors: [{ name: "BGK", url: "https://bgkcogito.co.kr" }],
  creator: "BGK", publisher: "BGK", applicationName: "BGK", category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    title: "BGK | 현장에서 작동하는 AI 소프트웨어",
    description: "현장의 문제를 기술로 해결하고, 유일한 가치를 만드는 BGK 공식 홈페이지",
    url: "https://bgkcogito.co.kr", siteName: "BGK", type: "website", locale: "ko_KR",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "BGK Practical AI Software Company" }],
  },
  twitter: { card: "summary_large_image", title: "BGK | 현장에서 작동하는 AI 소프트웨어", description: "현장에서 작동하는 실용적인 AI 소프트웨어를 만듭니다.", images: ["/twitter-image.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

const organizationSchema = {
  "@context": "https://schema.org", "@type": "Organization", name: "BGK", alternateName: "비지케이",
  url: "https://bgkcogito.co.kr", logo: "https://bgkcogito.co.kr/icon.png", email: "bgkcogito@naver.com", telephone: "+82-10-3015-2717",
  founder: { "@type": "Person", name: "장수빈", jobTitle: "Founder & CEO" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />{children}</body></html>;
}
