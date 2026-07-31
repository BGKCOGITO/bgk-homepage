import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "개인정보처리방침", description: "BGK 공식 홈페이지 개인정보처리방침", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <main className="legal-page"><div className="legal-shell">
      <Link className="legal-back" href="/">← BGK 홈으로</Link><p className="eyebrow">PRIVACY POLICY</p><h1>개인정보처리방침</h1>
      <p className="legal-lead">BGK는 이용자의 개인정보를 중요하게 생각하며 관련 법령에 따라 안전하게 처리합니다.</p>
      <section><h2>1. 수집하는 개인정보</h2><p>현재 BGK 홈페이지는 별도의 회원가입이나 문의 양식을 운영하지 않으며, 홈페이지 방문 과정에서 이용자가 직접 입력하는 개인정보를 수집하지 않습니다.</p></section>
      <section><h2>2. 이메일 및 전화 문의</h2><p>이용자가 이메일 또는 전화로 문의하는 경우, 상담과 회신을 위해 이름, 연락처, 이메일 주소 및 문의 내용을 처리할 수 있습니다. 해당 정보는 문의 처리 목적이 달성된 후 관계 법령에 따라 보관할 필요가 없는 경우 지체 없이 파기합니다.</p></section>
      <section><h2>3. 자동으로 수집될 수 있는 정보</h2><p>서비스의 안정적인 운영과 보안을 위해 접속 기록, 브라우저 정보, 기기 정보 등이 호스팅 제공업체를 통해 자동으로 처리될 수 있습니다.</p></section>
      <section><h2>4. 개인정보의 제3자 제공</h2><p>BGK는 법령에 근거가 있거나 이용자의 별도 동의가 있는 경우를 제외하고 개인정보를 제3자에게 제공하지 않습니다.</p></section>
      <section><h2>5. 개인정보 보호 문의</h2><dl className="legal-contact"><div><dt>상호</dt><dd>비지케이(BGK)</dd></div><div><dt>대표자</dt><dd>{site.representative}</dd></div><div><dt>이메일</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div><div><dt>연락처</dt><dd><a href={`tel:${site.phone.replaceAll("-", "")}`}>{site.phone}</a></dd></div></dl></section>
      <p className="legal-date">시행일: 2026년 7월 31일</p>
    </div></main>
  );
}
