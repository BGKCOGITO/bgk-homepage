import type { Metadata } from "next";
import Link from "next/link";
import BusinessInquiryForm from "@/components/BusinessInquiryForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "기업 맞춤형 SaaS 개발",
  description: "엑셀·메신저·수기 업무를 기업에 맞는 Web, App, PC 프로그램으로 구축하는 BGK 기업 맞춤형 SaaS 개발 서비스입니다.",
  alternates: { canonical: "/business" },
};

const modules = [
  ["QR 출퇴근", "회사 QR 스캔으로 출근·퇴근 시간 기록과 근무시간 조회"],
  ["연차·휴무", "연차 생성, 신청, 승인·반려와 직원별 사용 현황 관리"],
  ["급여·정산", "기본급·인센티브·수당·공제 입력과 월별 정산"],
  ["급여명세서", "정산 결과를 직원 앱에서 확인할 수 있는 명세서로 제공"],
  ["직원·권한", "대표·관리자·직원 계정과 역할별 기능 권한 관리"],
  ["채팅·공지", "업무 채팅, 회사 공지, 파일 전달과 확인"],
  ["알림", "연차 처리, 공지, 정산 등록 등 주요 업무 알림"],
  ["통계·리포트", "근태·업무·정산 데이터를 월별 대시보드로 확인"],
  ["예약·일정", "업종에 맞는 예약, 일정, 배정 및 진행상태 관리"],
  ["맞춤 기능", "기업의 기존 업무 흐름을 분석해 필요한 기능을 추가 구축"],
];

const plans = [
  ["WEB", "웹 개발", "390만원~", "관리자 페이지, 사내 업무 시스템, 고객용 웹 서비스 등"],
  ["WEB + APP", "웹 + 앱 개발", "690만원~", "관리자 웹과 직원·고객용 모바일 앱을 연동하는 시스템"],
  ["FULL SYSTEM", "웹 + 앱 + 프로그램 개발", "990만원~", "웹·모바일 앱·PC 프로그램을 하나의 데이터로 연결하는 통합 시스템"],
];

export default function BusinessPage() {
  return (
    <main className="business-page">
      <header className="business-header section-shell">
        <Link className="brand" href="/" aria-label="BGK 홈"><span className="brand-mark">BGK</span><span className="brand-sub">BECOME GLOBALLY KNOWN</span></Link>
        <nav><a href="#features">구현 기능</a><a href="#price">개발 비용</a><a href="#process">진행 절차</a><a className="business-nav-cta" href="#inquiry">무료 상담</a></nav>
      </header>

      <section className="business-hero section-shell">
        <p className="eyebrow">CUSTOM BUSINESS SaaS</p>
        <h1>엑셀과 메신저로 흩어진 업무를<br/><span>우리 회사만의 시스템으로.</span></h1>
        <p className="business-lead">BGK는 기업의 실제 업무 흐름을 분석해 Web · App · PC 프로그램으로 연결합니다. 이미 정해진 프로그램에 회사를 맞추는 것이 아니라, 회사가 일하는 방식에 맞는 도구를 구축합니다.</p>
        <div className="hero-actions"><a className="btn primary" href="#inquiry">무료 상담 신청</a><a className="btn secondary" href="#price">개발 비용 보기</a></div>
        <div className="business-tags"><span>근태관리</span><span>연차·휴무</span><span>급여·정산</span><span>채팅·공지</span><span>업무 자동화</span></div>
      </section>

      <section className="business-section section-shell pain-section">
        <div className="business-section-heading"><p className="eyebrow">STILL WORKING THIS WAY?</p><h2>아직도 이런 방식으로<br/>관리하고 계신가요?</h2><p>업무가 여러 도구에 흩어질수록 확인과 정산에 더 많은 시간이 필요합니다.</p></div>
        <div className="pain-grid">
          {["엑셀로 직원 근태 관리","카카오톡으로 휴무 신청","매월 수작업으로 급여·정산","공지와 업무지시가 여러 채팅방에 분산","직원별 자료를 파일로 따로 보관"].map((text)=><article key={text}><span>✓</span><p>{text}</p></article>)}
        </div>
        <div className="pain-message"><strong>회사의 기존 업무방식을 바꾸는 것이 아니라,</strong><br/>그 업무방식을 하나의 시스템으로 연결합니다.</div>
      </section>

      <section id="features" className="business-section section-shell">
        <div className="business-section-heading"><p className="eyebrow">BUILD WHAT YOU NEED</p><h2>필요한 기능만 조합하고,<br/>기업에 맞게 확장합니다.</h2><p>아래 기능은 예시입니다. 업종과 기존 업무 방식에 따라 필요한 화면과 기능을 다시 설계합니다.</p></div>
        <div className="module-grid">{modules.map(([title,text],i)=><article className="module-card" key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="business-section section-shell scenario-section">
        <div className="business-section-heading"><p className="eyebrow">BUILD EXAMPLE</p><h2>회사에 필요한 흐름을<br/>이렇게 연결할 수 있습니다.</h2><p>아래는 이해를 돕기 위한 구축 예시이며, 실제 기능은 각 기업의 업무 방식에 맞춰 구성합니다.</p></div>
        <div className="scenario-grid">
          <article><span>OFFICE · TEAM</span><h3>직원 30명 규모 기업이라면</h3><div className="scenario-flow">QR 출퇴근 <b>→</b> 연차 신청 <b>→</b> 대표 승인 <b>→</b> 근무시간 집계 <b>→</b> 급여 정산 <b>→</b> 급여명세서 발급</div></article>
          <article><span>FIELD · OPERATION</span><h3>현장 인력이 많은 기업이라면</h3><div className="scenario-flow">직원 등록 <b>→</b> 현장 배정 <b>→</b> 출퇴근 <b>→</b> 업무 공지 <b>→</b> 사진·자료 전송 <b>→</b> 월 정산</div></article>
        </div>
      </section>

      <section id="price" className="business-section section-shell">
        <div className="business-section-heading centered"><p className="eyebrow">STARTING PRICE</p><h2>구축 범위에 따라 선택하세요.</h2><p>아래 금액은 시작 가격이며 실제 견적은 기능, 화면 수, 외부 서비스 연동 및 개발 난이도에 따라 달라집니다.</p></div>
        <div className="build-plan-grid">{plans.map(([tag,title,price,desc])=><article className="build-plan" key={tag}><span>{tag}</span><h3>{title}</h3><strong>{price}</strong><p>{desc}</p><a href="#inquiry">상담 문의 →</a></article>)}</div>
        <p className="price-note">※ 정확한 개발비와 일정은 상담 후 요구사항을 정리하여 별도 견적으로 안내합니다.</p>
      </section>

      <section id="process" className="business-section section-shell">
        <div className="business-section-heading"><p className="eyebrow">PROCESS</p><h2>상담부터 구축까지<br/>명확하게 진행합니다.</h2></div>
        <div className="process-grid">{[["01","상담","현재 업무 방식과 불편한 점을 확인합니다."],["02","요구사항 정리","필요 기능과 개발 범위를 정리합니다."],["03","견적·계약","일정과 비용을 확정하고 개발 범위를 문서화합니다."],["04","개발·검수","실제 업무 흐름에 맞춰 구축하고 검수합니다."],["05","운영","서비스 오픈 후 필요한 유지관리와 추가 개발을 진행합니다."]].map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>

      <section className="business-section section-shell care-section">
        <div className="care-panel">
          <div><p className="eyebrow">AFTER LAUNCH</p><h2>개발 후에도<br/>계속 관리합니다.</h2><p>구축 완료가 끝이 아닙니다. 실제 운영 중 발생하는 수정과 개선도 BGK가 함께 관리합니다.</p></div>
          <div className="care-list">{["오류 및 장애 대응","경미한 문구·화면 수정","서버·서비스 운영 지원","추가 기능 개발","Web · App · PC 프로그램 통합 관리"].map((text)=><span key={text}>{text}</span>)}</div>
        </div>
      </section>

      <section id="inquiry" className="business-section section-shell inquiry-section">
        <div className="inquiry-copy"><p className="eyebrow">CONTACT BGK</p><h2 className="inquiry-title"><span>지금 사용 중인 엑셀부터</span><span>보여주셔도 됩니다.</span></h2><p>어떤 프로그램이 필요한지 아직 정하지 못하셔도 괜찮습니다. 현재 사용 중인 엑셀이나 업무 방식을 알려주시면 BGK가 필요한 시스템을 함께 설계합니다.</p><div className="direct-contact"><span>PHONE <b>{site.phone}</b></span><span>EMAIL <b>{site.email}</b></span></div></div>
        <BusinessInquiryForm />
      </section>

      <footer className="business-footer section-shell"><Link href="/">← BGK 홈페이지</Link><p>© {new Date().getFullYear()} BGK. All rights reserved.</p></footer>
    </main>
  );
}
