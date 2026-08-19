import Link from "next/link";
import { site } from "@/data/site";

export default function BusinessPage() {
  return (
    <main className="workcraft-bridge-page">
      <section className="workcraft-bridge-card">
        <p className="kicker">BGK WORKCRAFT</p>
        <h1>기업 맞춤형 업무 시스템 구축</h1>
        <p>WORKCRAFT는 비지케이(BGK)가 직접 운영하는 기업 맞춤형 업무 시스템 구축 서비스입니다.</p>
        <div className="workcraft-bridge-info">
          <div><span>운영</span><strong>비지케이(BGK)</strong></div>
          <div><span>대표</span><strong>{site.representative}</strong></div>
          <div><span>사업자등록번호</span><strong>{site.businessNumber}</strong></div>
          <div><span>주소</span><strong>{site.address}</strong></div>
        </div>
        <div className="hero-buttons">
          <a className="button button-primary" href="https://workcraft.bgkcogito.co.kr" target="_blank" rel="noreferrer">WORKCRAFT 공식 웹</a>
          <a className="button button-secondary" href="https://workcraft.bgkcogito.co.kr/#/quote" target="_blank" rel="noreferrer">예상견적 시작</a>
          <Link className="button button-ghost" href="/">BGK 홈페이지</Link>
        </div>
      </section>
    </main>
  );
}
