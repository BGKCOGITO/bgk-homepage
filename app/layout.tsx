import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BGK | Become Globally Known",
  description: "AI와 소프트웨어로 실제 산업의 문제를 해결하는 BGK 공식 홈페이지",
  keywords: ["BGK", "PAWU", "DELIVO", "AI", "소프트웨어", "SaaS"],
  openGraph: {
    title: "BGK | Become Globally Known",
    description: "현장의 문제를 기술로 해결하고, 유일한 가치를 만드는 기업",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
