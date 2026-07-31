import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://bgkcogito.co.kr/sitemap.xml",
    host: "https://bgkcogito.co.kr",
  };
}
