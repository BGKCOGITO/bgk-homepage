import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bgkcogito.co.kr"),
  title: { default: "BGK | 기업 맞춤 구축과 산업 플랫폼", template: "%s | BGK" },
  description: "BGK는 현장을 직접 확인해 Web·App·PC 프로그램을 구축하고, DELIVO와 PAWU를 직접 운영하는 소프트웨어 기업입니다.",
  keywords: ["BGK", "비지케이", "WORKCRAFT", "기업 맞춤 개발", "업무자동화", "Web App PC 프로그램", "DELIVO", "PAWU", "SaaS"],
  authors: [{ name: "BGK", url: "https://bgkcogito.co.kr" }],
  creator: "BGK",
  publisher: "BGK",
  applicationName: "BGK",
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    title: "BGK | 현장을 이해하고, 작동하는 시스템을 구축합니다",
    description: "기업 맞춤 시스템 구축 WORKCRAFT와 산업별 SaaS DELIVO·PAWU를 운영하는 BGK 공식 홈페이지",
    url: "https://bgkcogito.co.kr",
    siteName: "BGK",
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "BGK Business Technology Company" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BGK | 기업 맞춤 구축과 산업 플랫폼",
    description: "현장을 이해하고, 작동하는 시스템을 구축합니다.",
    images: ["/twitter-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BGK",
  alternateName: "비지케이",
  url: "https://bgkcogito.co.kr",
  logo: "https://bgkcogito.co.kr/icon.png",
  email: "bgkcogito@naver.com",
  telephone: "+82-10-3015-2717",
  founder: { "@type": "Person", name: "장수빈", jobTitle: "Founder & CEO" },
  department: [
    { "@type": "Organization", name: "BGK WORKCRAFT", description: "기업 현장진단형 맞춤 시스템 구축" },
    { "@type": "Organization", name: "DELIVO", description: "택배회사 운영 SaaS" },
    { "@type": "Organization", name: "PAWU", description: "반려동물 의료 플랫폼" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        {children}
      </body>
    </html>
  );
}
