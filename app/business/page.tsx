import type { Metadata } from "next";
import Link from "next/link";
import WorkcraftDiagnosis from "@/components/WorkcraftDiagnosis";
import { site } from "@/data/site";
import { workcraftPromotion, workcraftPromotionOpen } from "@/data/workcraftPromotion";

export const metadata: Metadata = {
  title: "WORKCRAFT | 기업 현장진단·맞춤 시스템 구축",
  description: "BGK WORKCRAFT는 기업별 현장진단 후 Web·App·Windows 업무 시스템을 유료 맞춤 구축합니다. 출시 기념 선착순 10개 기업은 추가 기능 1개 개발비를 100% 지원합니다.",
  alternates: { canonical: "/business" },
};

const strengths = [
  ["현장진단", "대표와 실무자의 실제 업무 흐름을 직접 확인합니다."],
  ["직접 설계·개발", "기획부터 Web·App·Windows 업무 시스템 구축까지 BGK가 수행합니다."],
  ["명확한 계약", "최종 견적서와 개발범위서(SOW)로 포함·제외 범위를 문서화합니다."],
  ["운영까지 책임", "배포 이후 장애 대응, 개선, 추가 개발을 이어갑니다."],
];

const process = [
  ["01", "온라인 진단", "구축 단계와 필요한 기능을 선택하고 현재 불편을 입력합니다."],
  ["02", "예상 견적 발행", "선택한 범위를 기준으로 평균 구축비와 예상 기간을 확인합니다."],
  ["03", "내부 검토·일정 확정", "예산, 업종, 구현 가능성과 의사결정자 참석 여부를 검토합니다."],
  ["04", "현장진단·협의", "엑셀·시트·문서·장부·기존 프로그램과 실제 담당자의 업무 순서를 확인합니다."],
  ["05", "최종 견적·계약", "최종 견적서, SOW, 운영 조건을 확정하고 계약서를 작성합니다."],
  ["06", "개발·검수·배포", "계약금 입금 후 개발하고 검수·잔금·배포·운영관리로 이어갑니다."],
];

const visitChecklist = [
  "실제 입력자와 승인자의 업무 순서",
  "엑셀·시트·문서·카카오톡·수기 장부 사용 방식",
  "직원·현장·거래처별 관리 기준",
  "급여·수당·인센티브·정산 계산식",
  "기존 데이터 규모와 이전 필요 범위",
  "권한·알림·결제·외부 연동 요구사항",
];

const workcraftServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "BGK WORKCRAFT",
  serviceType: "기업 맞춤형 Web·App·Windows 업무 시스템 개발·구축",
  url: "https://bgkcogito.co.kr/business",
  areaServed: { "@type": "Country", name: "대한민국" },
  provider: {
    "@type": "Organization",
    name: "BGK",
    url: "https://bgkcogito.co.kr",
  },
  description: "고객사 업무를 분석한 뒤 계약에 따라 유료로 맞춤 설계·개발·구축하는 B2B 서비스이며, 완성형 범용 제품을 일반 사용자에게 판매·배포하는 방식이 아닙니다.",
  offers: [
    { "@type": "Offer", name: "WORKCRAFT CORE", price: "3900000", priceCurrency: "KRW", description: "Web 업무시스템 맞춤 구축 시작가" },
    { "@type": "Offer", name: "WORKCRAFT CONNECT", price: "6900000", priceCurrency: "KRW", description: "Web + Android App 맞춤 구축 시작가" },
    { "@type": "Offer", name: "WORKCRAFT SUITE", price: "9900000", priceCurrency: "KRW", description: "Web + Android App + Windows 업무 클라이언트 맞춤 구축 시작가" },
  ],
};

export default function BusinessPage() {
  return (
    <main className="workcraft-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workcraftServiceSchema) }} />
      <header className="sub-header shell">
        <Link className="brand brand-dark" href="/" aria-label="BGK 홈">
          <span className="brand-mark">BGK</span>
          <span className="brand-sub">BECOME GLOBALLY KNOWN</span>
        </Link>
        <nav>
          <a href="#method">진행방식</a>
          <a href="#diagnosis">온라인 진단</a>
          <a href="#quality">품질원칙</a>
          <a className="nav-cta" href="#diagnosis">예상 견적 확인</a>
        </nav>
      </header>

      <section className={`workcraft-promo-banner ${workcraftPromotionOpen ? "open" : "closed"}`} aria-label="WORKCRAFT 출시 프로모션">
        <div className="shell workcraft-promo-grid">
          <div className="workcraft-promo-copy">
            <span className="workcraft-promo-label">WORKCRAFT 선착순 프로모션</span>
            <p>{workcraftPromotion.title}</p>
            <h2>{workcraftPromotion.benefit}</h2>
            <strong>유료 구축 계약 기업 대상 · 추가 기능 1개 개발비 지원</strong>
            <div className="workcraft-promo-eligibility">
              {workcraftPromotion.eligibility.map((item) => <span key={item}>✓ {item}</span>)}
            </div>
          </div>
          <aside className="workcraft-promo-count">
            <span>{workcraftPromotionOpen ? "현재 남은 프로모션" : "프로모션 상태"}</span>
            <div><strong>{workcraftPromotionOpen ? workcraftPromotion.remainingSlots : 0}</strong><em>/ {workcraftPromotion.totalSlots}개 기업</em></div>
            <p>{workcraftPromotionOpen ? "계약서 체결 및 계약금 확인 순으로 차감됩니다." : "선착순 프로모션이 마감되었습니다."}</p>
            {workcraftPromotionOpen && <a className="button button-primary" href="#diagnosis">프로모션 견적 확인</a>}
          </aside>
        </div>
        <div className="shell workcraft-promo-exclusions">
          <b>제외 항목</b>
          <div>{workcraftPromotion.exclusions.map((item) => <span key={item}>· {item}</span>)}</div>
          <small>{workcraftPromotion.countRule}</small>
        </div>
      </section>

      <section className="workcraft-hero shell">
        <div className="workcraft-hero-copy">
          <p className="kicker">BGK WORKCRAFT · ON-SITE BUSINESS SYSTEM BUILD</p>
          <h1>전화로 묻지 않습니다.<br /><span>현장에서 보고 설계합니다.</span></h1>
          <p className="hero-description">
            BGK는 현재 사용 중인 엑셀, 시트, 한글·Word·PDF 문서, 카카오톡, 수기 장부와 담당자의 실제 업무를 현장에서 확인합니다.
            기존 프로그램에 회사를 맞추는 것이 아니라, 회사가 일하는 방식에 맞춰 Web·App·Windows 업무 시스템과 AI 자동화를 구축합니다.
          </p>
          <div className="hero-buttons">
            <a className="button button-primary" href="#diagnosis">온라인 진단 시작</a>
            <a className="button button-ghost" href="#method">진행 절차 확인</a>
          </div>
          <p className="hero-policy">WORKCRAFT는 일반 소비자용 완제품 판매가 아닌 B2B 유료 맞춤 구축 서비스입니다.</p>
        </div>

        <aside className="workcraft-hero-panel" aria-label="BGK WORKCRAFT 핵심 원칙">
          <div className="panel-topline"><span>WORKCRAFT STANDARD</span><b>01</b></div>
          <h2>현장을 모르면<br />정확한 시스템을 만들 수 없습니다.</h2>
          <div className="principle-list">
            <div><span>DISCOVER</span><p>실제 업무와 불편을 확인합니다.</p></div>
            <div><span>DESIGN</span><p>업무 흐름과 권한을 설계합니다.</p></div>
            <div><span>BUILD</span><p>웹·앱·Windows 업무 시스템으로 구현합니다.</p></div>
            <div><span>OPERATE</span><p>배포 후 운영과 개선을 이어갑니다.</p></div>
          </div>
        </aside>
      </section>

      <section className="service-clarity shell" aria-label="WORKCRAFT 서비스 안내">
        <strong>WORKCRAFT는 고객사별 계약으로 진행하는 유료 맞춤 개발·구축 서비스입니다.</strong>
        <p>출시 프로모션은 전체 구축을 무료로 제공하는 것이 아니라, 유료 구축 계약 시 최종 계약에 포함되는 추가 기능 1개의 BGK 개발비를 지원하는 혜택입니다.</p>
      </section>

      <section className="trust-strip">
        <div className="shell trust-grid">
          {strengths.map(([title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section id="method" className="workcraft-section shell">
        <div className="section-intro split-intro">
          <div><p className="kicker">FROM DIAGNOSIS TO DELIVERY</p><h2>문의가 아니라,<br />검증 가능한 절차로 진행합니다.</h2></div>
          <p>온라인에서 대략적인 범위를 정리하고, BGK가 현장에서 실제 업무를 확인한 뒤 최종 견적과 계약범위를 확정합니다.</p>
        </div>
        <div className="process-timeline">
          {process.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="workcraft-section workcraft-dark">
        <div className="shell onsite-grid">
          <div className="onsite-copy">
            <p className="kicker kicker-light">ON-SITE DIAGNOSIS</p>
            <h2>말로 정리된 요구사항보다<br />실제 업무를 확인합니다.</h2>
            <p>현장진단은 약 60~90분을 기준으로 진행하며, 대표 또는 의사결정자와 실제 담당자가 함께 참석하는 것을 권장합니다.</p>
          </div>
          <div className="onsite-checklist">
            {visitChecklist.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}
          </div>
        </div>
      </section>

      <section id="quality" className="workcraft-section shell capacity-section">
        <div className="capacity-card">
          <div>
            <p className="kicker">QUALITY OVER VOLUME</p>
            <h2>BGK는 무리하게<br />프로젝트를 수주하지 않습니다.</h2>
            <p>한 프로젝트에 충분한 시간을 투입하고 제작 품질을 유지하기 위해 매월 현장진단과 신규 구축 수를 제한합니다.</p>
          </div>
          <div className="capacity-numbers">
            <div><span>MONTHLY ON-SITE</span><strong>최대 8개사</strong><p>현장진단·업무 확인</p></div>
            <div><span>NEW BUILD</span><strong>최대 3개사</strong><p>신규 구축 착수</p></div>
          </div>
          <p className="capacity-note">신청이 많을 경우 접수 순서와 프로젝트 적합성을 검토해 다음 일정으로 안내할 수 있습니다. 많이 만들기보다, 실제로 작동하는 시스템을 만듭니다.</p>
        </div>
      </section>

      <section id="diagnosis" className="workcraft-section diagnosis-section">
        <div className="shell">
          <div className="section-intro centered narrow">
            <p className="kicker">ONLINE DIAGNOSIS & ESTIMATE</p>
            <h2>필요한 범위를 선택하고<br />예상 견적을 먼저 확인하세요.</h2>
            <p>WORKCRAFT CORE·CONNECT·SUITE 3개 구축 패키지와 추가 기능의 시장 참고 평균값을 기준으로 예상 금액과 기간을 산출합니다. 현장진단 전 예산과 범위를 확인하는 1차 도구입니다.</p>
          </div>
          <WorkcraftDiagnosis />
        </div>
      </section>

      <section className="workcraft-section shell contract-section">
        <div className="contract-panel">
          <div><p className="kicker">CLEAR SCOPE & CONTRACT</p><h2>개발 전에 범위와 책임을<br />문서로 확정합니다.</h2></div>
          <div className="contract-docs">
            <article><span>01</span><h3>최종 견적서</h3><p>확정 금액, 일정, 결제조건과 유효기간을 명시합니다.</p></article>
            <article><span>02</span><h3>개발범위서(SOW)</h3><p>포함 기능, 제외 범위, 검수 기준과 변경 절차를 정리합니다.</p></article>
            <article><span>03</span><h3>구축 계약서</h3><p>계약금·잔금, 지식재산권, 하자보수와 운영 조건을 확정합니다.</p></article>
          </div>
          <div className="change-policy">
            <b>추가 비용 원칙</b>
            <p>개발 중 최초 확정 범위에 포함되지 않은 신규 기능이나 정책 변경으로 추가 작업이 필요한 경우, 사유·금액·일정을 먼저 안내합니다. 고객의 서면 동의 없이 추가 비용을 청구하지 않습니다.</p>
          </div>
        </div>
      </section>

      <footer className="corporate-footer shell">
        <div><Link className="footer-logo" href="/">BGK</Link><p>현장을 이해하고, 작동하는 시스템을 구축합니다.</p></div>
        <dl>
          <div><dt>대표</dt><dd>{site.representative}</dd></div>
          <div><dt>사업자등록번호</dt><dd>{site.businessNumber}</dd></div>
          <div><dt>행정 문의</dt><dd>{site.email}</dd></div>
          <div><dt>주소</dt><dd>{site.address}</dd></div>
          <div><dt>제공 서비스</dt><dd>기업 맞춤형 Web·App·Windows 업무 시스템 유료 개발·구축</dd></div>
        </dl>
        <div className="footer-links">
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/">BGK 회사소개</Link>
        </div>
        <p className="copyright">© {new Date().getFullYear()} BGK. All rights reserved.</p>
      </footer>
    </main>
  );
}
