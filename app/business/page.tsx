import type { Metadata } from "next";
import Link from "next/link";
import WorkcraftLandingCta, { WorkcraftLandingTracker } from "@/components/WorkcraftLandingCta";
import { site } from "@/data/site";
import { workcraftPromotion, workcraftPromotionOpen } from "@/data/workcraftPromotion";

const WORKCRAFT_QUOTE_URL =
  "https://workcraft.bgkcogito.co.kr/?utm_source=bgk_business&utm_medium=landing&utm_campaign=workcraft_quick_quote#/quote";
const KAKAO_URL = "http://pf.kakao.com/_DCISX";
const PHONE_URL = `tel:${site.phone.replace(/\D/g, "")}`;

export const metadata: Metadata = {
  title: "WORKCRAFT | 30초 기업 맞춤 시스템 예상견적",
  description:
    "엑셀·카톡·수기 업무를 회사 전용 Web·App·Windows 시스템으로 구축합니다. 연락처 없이 30초 예상견적을 먼저 확인하고 필요할 때만 무료 상담을 요청하세요.",
  alternates: { canonical: "/business" },
  openGraph: {
    title: "WORKCRAFT | 연락처 없이 30초 예상견적",
    description: "엑셀·카톡·수기 업무를 회사 전용 시스템으로 바꿔드립니다.",
    url: "https://bgkcogito.co.kr/business",
    type: "website",
  },
};

const painPoints = [
  ["엑셀·시트 반복 수정", "같은 내용을 여러 파일에 다시 입력하고 있습니다."],
  ["카톡으로 개별 전달", "공지·정산·일정이 대화방에 흩어져 누락됩니다."],
  ["수기 승인·정산", "담당자 확인과 계산에 시간이 계속 들어갑니다."],
  ["기존 프로그램의 한계", "우리 회사의 실제 업무 순서와 맞지 않습니다."],
] as const;

const quoteSteps = [
  {
    number: "01",
    title: "구축형태 선택",
    description: "WEB, WEB+APP, WEB+APP+PC 중 가장 가까운 형태만 고릅니다.",
    image: "/images/workcraft-landing/quote-step1.webp",
    alt: "WORKCRAFT 30초 예상견적 구축형태 선택 화면",
  },
  {
    number: "02",
    title: "필요한 업무 선택",
    description: "정확히 몰라도 괜찮습니다. ‘잘 모르겠어요’를 선택해도 됩니다.",
    image: "/images/workcraft-landing/quote-step2.webp",
    alt: "WORKCRAFT 필요한 업무 간편 선택 화면",
  },
  {
    number: "03",
    title: "금액 확인 후 상담 선택",
    description: "가격을 먼저 본 뒤 상담이 필요할 때만 성함과 연락처를 남깁니다.",
    image: "/images/workcraft-landing/quote-step3.webp",
    alt: "WORKCRAFT 예상금액 확인과 무료 상담 요청 화면",
  },
] as const;

const packages = [
  {
    code: "WEB",
    price: "390만원부터",
    description: "반응형 웹과 관리자 시스템",
    examples: "사내 업무관리 · 고객관리 · 정산 · 예약",
    recommended: false,
  },
  {
    code: "WEB + APP",
    price: "690만원부터",
    description: "관리자 웹과 Android 앱 연결",
    examples: "현장직원 · 기사 · 고객용 앱 · 푸시알림",
    recommended: true,
  },
  {
    code: "WEB + APP + PC",
    price: "990만원부터",
    description: "웹·모바일·Windows 통합 운영",
    examples: "복합 업무 · 병원 · 다지점 · 전용 클라이언트",
    recommended: false,
  },
] as const;

const faqs = [
  [
    "무엇을 만들어야 할지 정확히 몰라도 되나요?",
    "네. 지금 사용하는 엑셀·카톡·문서와 가장 불편한 업무만 말씀해주시면 됩니다. 기능명이나 개발용어를 미리 정할 필요가 없습니다.",
  ],
  [
    "예상견적을 확인하면 바로 계약해야 하나요?",
    "아닙니다. 가격 확인과 상담 요청은 무료이며, 신청만으로 계약이나 비용이 발생하지 않습니다.",
  ],
  [
    "상담 요청에는 무엇을 입력하나요?",
    "필수 입력은 성함과 연락처 두 가지입니다. 회사명과 현재 불편한 업무는 선택사항입니다.",
  ],
  [
    "화면에 나온 금액이 최종금액인가요?",
    "온라인 금액은 빠른 판단을 위한 예상범위입니다. 실제 사용자 수, 데이터 이전, 외부연동과 업무 난이도를 확인한 뒤 최종 견적을 확정합니다.",
  ],
] as const;

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
  description:
    "연락처 없이 30초 예상견적을 먼저 확인하고, 필요할 때만 무료 상담을 요청할 수 있는 기업 맞춤 시스템 구축 서비스입니다.",
  offers: packages.map((item) => ({
    "@type": "Offer",
    name: item.code,
    price: item.price.replace(/[^0-9]/g, "") + "0000",
    priceCurrency: "KRW",
    description: item.description,
  })),
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4.5 10.2 3.4 3.4 7.6-7.7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BusinessPage() {
  return (
    <main className="wc-conversion-page">
      <WorkcraftLandingTracker />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workcraftServiceSchema) }} />

      <header className="wc-conversion-header">
        <div className="shell wc-conversion-header-inner">
          <Link className="wc-conversion-brand" href="/" aria-label="BGK 홈">
            <span className="wc-conversion-brand-mark">BGK</span>
            <span className="wc-conversion-brand-copy"><b>WORKCRAFT</b><small>BUSINESS SYSTEM BUILD</small></span>
          </Link>
          <div className="wc-conversion-header-actions">
            <span>상담 무료 · 신청만으로 계약되지 않음</span>
            <WorkcraftLandingCta href={KAKAO_URL} eventName="kakao_click" className="wc-link-button" target="_blank" rel="noreferrer">
              카카오 문의
            </WorkcraftLandingCta>
            <WorkcraftLandingCta href={WORKCRAFT_QUOTE_URL} eventName="quote_click" className="wc-primary-button">
              30초 예상견적 <ArrowIcon />
            </WorkcraftLandingCta>
          </div>
        </div>
      </header>

      <section className="wc-conversion-hero">
        <div className="wc-conversion-hero-glow" aria-hidden="true" />
        <div className="shell wc-conversion-hero-grid">
          <div className="wc-conversion-hero-copy">
            <p className="wc-conversion-kicker">30-SECOND BUSINESS SYSTEM ESTIMATE</p>
            <h1>
              엑셀·카톡·수기 업무,
              <br />
              <span>회사 전용 시스템으로 바꿔드립니다.</span>
            </h1>
            <p className="wc-conversion-lead">
              개발용어나 정확한 기능을 몰라도 괜찮습니다. 지금 반복되는 업무만 떠올리고
              <strong> 연락처 없이 예상금액부터 확인</strong>하세요.
            </p>

            <div className="wc-conversion-hero-actions">
              <WorkcraftLandingCta href={WORKCRAFT_QUOTE_URL} eventName="quote_click" className="wc-primary-button wc-primary-button-lg">
                30초 예상견적 확인 <ArrowIcon />
              </WorkcraftLandingCta>
              <WorkcraftLandingCta href={KAKAO_URL} eventName="kakao_click" className="wc-secondary-button wc-secondary-button-lg" target="_blank" rel="noreferrer">
                카카오톡으로 바로 문의
              </WorkcraftLandingCta>
              <WorkcraftLandingCta href={PHONE_URL} eventName="phone_click" className="wc-text-action" ariaLabel={`${site.phone} 전화 상담`}>
                전화 상담 {site.phone}
              </WorkcraftLandingCta>
            </div>

            <div className="wc-conversion-assurance" aria-label="예상견적 안내">
              <span><CheckIcon /> 연락처 없이 가격 먼저</span>
              <span><CheckIcon /> 약 30초</span>
              <span><CheckIcon /> 상담 요청 무료</span>
              <span><CheckIcon /> 문의만으로 계약되지 않음</span>
            </div>
          </div>

          <div className="wc-conversion-hero-visual">
            <div className="wc-conversion-browser">
              <div className="wc-conversion-browser-top"><i /><i /><i /><span>workcraft.bgkcogito.co.kr</span></div>
              <img src="/images/workcraft-landing/quote-step3.webp" alt="가격을 먼저 확인하고 최소 정보로 상담 요청하는 WORKCRAFT 화면" width="1200" height="900" loading="eager" />
            </div>
            <div className="wc-floating-note wc-floating-note-one"><b>① 가격 먼저 확인</b><span>연락처 입력 없음</span></div>
            <div className="wc-floating-note wc-floating-note-two"><b>② 필요할 때만 상담</b><span>성함·연락처 2개</span></div>
          </div>
        </div>
      </section>

      {workcraftPromotionOpen && (
        <section className="wc-promo-compact" aria-label="WORKCRAFT 출시 프로모션">
          <div className="shell wc-promo-compact-inner">
            <span>출시 기념</span>
            <div>
              <b>{workcraftPromotion.title}</b>
              <strong>{workcraftPromotion.benefit}</strong>
            </div>
            <small>유료 구축 계약 · 최종 견적/SOW 포함 옵션 기준 · 외부 서비스 비용 제외</small>
            <WorkcraftLandingCta href={WORKCRAFT_QUOTE_URL} eventName="quote_click" className="wc-promo-link">
              예상견적 확인 <ArrowIcon />
            </WorkcraftLandingCta>
          </div>
        </section>
      )}

      <section className="wc-conversion-section wc-problem-section">
        <div className="shell">
          <div className="wc-conversion-section-heading wc-conversion-section-heading-split">
            <div>
              <p className="wc-conversion-kicker">START WITH YOUR REAL WORK</p>
              <h2>개발용어보다<br />지금 불편한 업무만 말씀해주세요.</h2>
            </div>
            <p>
              정답을 고르는 상담이 아닙니다. 현재 어떤 파일을 수정하고, 누구에게 전달하고,
              어디에서 누락되는지만 알려주시면 가장 단순한 구조부터 함께 정리합니다.
            </p>
          </div>

          <div className="wc-pain-grid">
            {painPoints.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <div className="wc-problem-bridge">
            <div>
              <b>예시</b>
              <p>“엑셀로 정산하고 카톡으로 직원에게 따로 보냅니다.”</p>
            </div>
            <ArrowIcon />
            <div>
              <b>WORKCRAFT 상담</b>
              <p>업로드·계산·확인·알림을 어느 범위까지 연결할지 정리합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="wc-conversion-section wc-quote-flow-section" id="quick-quote">
        <div className="shell">
          <div className="wc-conversion-section-heading centered">
            <p className="wc-conversion-kicker">HOW IT WORKS</p>
            <h2>가격 확인까지 세 단계면 충분합니다.</h2>
            <p>회사정보와 연락처를 먼저 요구하지 않습니다. 금액을 본 뒤 계속 진행할지 결정하세요.</p>
          </div>

          <div className="wc-quote-step-grid">
            {quoteSteps.map((step) => (
              <article key={step.number} className="wc-quote-step-card">
                <div className="wc-quote-step-copy">
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                <div className="wc-quote-step-image">
                  <img src={step.image} alt={step.alt} width="1200" height={step.number === "01" ? "725" : step.number === "02" ? "875" : "900"} loading="lazy" />
                </div>
              </article>
            ))}
          </div>

          <div className="wc-centered-action">
            <WorkcraftLandingCta href={WORKCRAFT_QUOTE_URL} eventName="quote_click" className="wc-primary-button wc-primary-button-lg">
              내 회사 기준으로 30초 견적 보기 <ArrowIcon />
            </WorkcraftLandingCta>
            <p>가격만 확인하고 종료해도 됩니다.</p>
          </div>
        </div>
      </section>

      <section className="wc-conversion-section wc-proof-section">
        <div className="shell">
          <div className="wc-conversion-section-heading wc-conversion-section-heading-split">
            <div>
              <p className="wc-conversion-kicker">BUILT BY BGK</p>
              <h2>말로만 설명하지 않고,<br />실제로 구축한 시스템으로 보여드립니다.</h2>
            </div>
            <p>
              BGK는 WORKCRAFT 자체 운영시스템과 산업별 플랫폼을 직접 기획·구축해왔습니다.
              상담에서도 비슷한 실제 화면과 업무 흐름을 기준으로 설명합니다.
            </p>
          </div>

          <div className="wc-proof-grid">
            <article className="wc-proof-card wc-proof-card-delivo">
              <div className="wc-proof-card-copy">
                <span>LOGISTICS OPERATIONS</span>
                <h3>DELIVO</h3>
                <p>택배 회사웹·회사앱과 기사앱을 연결한 운영관리 플랫폼</p>
                <ul>
                  <li><CheckIcon /> 기사·노선·근무표·휴무 관리</li>
                  <li><CheckIcon /> 공지·채팅·정산·운영통계</li>
                  <li><CheckIcon /> 회사용·기사용 Google Play 정식 출시</li>
                </ul>
              </div>
              <div className="wc-proof-device">
                <img src="/images/workcraft-landing/delivo-dashboard.webp" alt="DELIVO 회사앱 운영 대시보드" width="720" height="1039" loading="lazy" />
              </div>
            </article>

            <article className="wc-proof-card wc-proof-card-pawu">
              <div className="wc-proof-pawu-mark">
                <img src="/images/pawu.png" alt="PAWU 로고" width="262" height="260" loading="lazy" />
              </div>
              <div className="wc-proof-card-copy">
                <span>VETERINARY CARE PLATFORM</span>
                <h3>PAWU</h3>
                <p>동물병원 프로그램과 보호자 앱을 하나의 진료 전·중·후 흐름으로 연결한 플랫폼</p>
                <ul>
                  <li><CheckIcon /> 예약·보호자 채팅·전자차트</li>
                  <li><CheckIcon /> 처방·입원·검사·건강기록</li>
                  <li><CheckIcon /> 보호자 앱 Google Play 정식 출시</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="wc-conversion-section wc-pricing-simple-section" id="pricing">
        <div className="shell">
          <div className="wc-conversion-section-heading centered">
            <p className="wc-conversion-kicker">STARTING PRICE</p>
            <h2>복잡한 기능 가격표 대신<br />필요한 운영환경부터 확인합니다.</h2>
            <p>아래는 VAT 포함 기본 구축 시작가입니다. 기능은 30초 견적에서 가볍게 선택할 수 있습니다.</p>
          </div>

          <div className="wc-simple-price-grid">
            {packages.map((item) => (
              <article key={item.code} className={item.recommended ? "recommended" : undefined}>
                {item.recommended && <span className="wc-price-recommend">가장 많이 검토하는 형태</span>}
                <small>{item.code}</small>
                <h3>{item.price}</h3>
                <p>{item.description}</p>
                <strong>{item.examples}</strong>
                <WorkcraftLandingCta href={WORKCRAFT_QUOTE_URL} eventName="quote_click" className="wc-price-link">
                  이 형태로 예상견적 확인 <ArrowIcon />
                </WorkcraftLandingCta>
              </article>
            ))}
          </div>

          <div className="wc-pricing-note">
            <b>온라인 예상견적은 최종 계약금액이 아닙니다.</b>
            <span>사용자 수, 데이터 이전, 외부 API, 정책과 화면 난이도를 확인한 뒤 추가되는 범위만 명확히 안내합니다.</span>
          </div>
        </div>
      </section>

      <section className="wc-conversion-section wc-faq-section">
        <div className="shell wc-faq-layout">
          <div className="wc-faq-intro">
            <p className="wc-conversion-kicker">BEFORE YOU ASK</p>
            <h2>일단 문의해도<br />괜찮습니다.</h2>
            <p>상담 단계에서는 회사에 필요한 기능을 완벽하게 정리하지 않아도 됩니다.</p>
            <WorkcraftLandingCta href={KAKAO_URL} eventName="kakao_click" className="wc-secondary-button" target="_blank" rel="noreferrer">
              카카오톡으로 질문하기
            </WorkcraftLandingCta>
          </div>
          <div className="wc-faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="wc-conversion-final">
        <div className="shell wc-conversion-final-inner">
          <div>
            <p className="wc-conversion-kicker">START WITH THE PRICE</p>
            <h2>가격부터 확인하고,<br />필요할 때만 상담을 남겨주세요.</h2>
            <p>약 30초면 대략적인 구축비·기간·월 유지관리비를 확인할 수 있습니다.</p>
          </div>
          <div className="wc-conversion-final-actions">
            <WorkcraftLandingCta href={WORKCRAFT_QUOTE_URL} eventName="quote_click" className="wc-white-button">
              30초 예상견적 확인 <ArrowIcon />
            </WorkcraftLandingCta>
            <WorkcraftLandingCta href={KAKAO_URL} eventName="kakao_click" className="wc-outline-light-button" target="_blank" rel="noreferrer">
              카카오톡 상담
            </WorkcraftLandingCta>
            <WorkcraftLandingCta href={PHONE_URL} eventName="phone_click" className="wc-outline-light-button">
              전화 {site.phone}
            </WorkcraftLandingCta>
          </div>
        </div>
      </section>

      <footer className="wc-conversion-footer">
        <div className="shell wc-conversion-footer-grid">
          <div>
            <Link className="wc-conversion-brand" href="/">
              <span className="wc-conversion-brand-mark">BGK</span>
              <span className="wc-conversion-brand-copy"><b>WORKCRAFT</b><small>BUSINESS SYSTEM BUILD</small></span>
            </Link>
            <p>현장을 이해하고, 작동하는 시스템을 구축합니다.</p>
          </div>
          <dl>
            <div><dt>운영</dt><dd>비지케이(BGK)</dd></div>
            <div><dt>대표</dt><dd>{site.representative}</dd></div>
            <div><dt>사업자등록번호</dt><dd>{site.businessNumber}</dd></div>
            <div><dt>전화</dt><dd><a href={PHONE_URL}>{site.phone}</a></dd></div>
            <div><dt>이메일</dt><dd>{site.email}</dd></div>
            <div><dt>주소</dt><dd>{site.address}</dd></div>
          </dl>
          <div className="wc-conversion-footer-links">
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/">BGK 회사소개</Link>
          </div>
          <p className="wc-conversion-copyright">© {new Date().getFullYear()} BGK. All rights reserved.</p>
        </div>
      </footer>

      <div className="wc-mobile-conversion-bar" aria-label="모바일 빠른 문의">
        <WorkcraftLandingCta href={KAKAO_URL} eventName="kakao_click" className="wc-mobile-kakao" target="_blank" rel="noreferrer">
          카카오 문의
        </WorkcraftLandingCta>
        <WorkcraftLandingCta href={WORKCRAFT_QUOTE_URL} eventName="quote_click" className="wc-mobile-quote">
          30초 예상견적 <ArrowIcon />
        </WorkcraftLandingCta>
      </div>
    </main>
  );
}
