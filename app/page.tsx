import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { workcraftPromotion, workcraftPromotionOpen } from "@/data/workcraftPromotion";

const serviceLines = [
  {
    eyebrow: "ENTERPRISE BUILD",
    name: "WORKCRAFT",
    title: "기업의 실제 업무를 보고, 전용 시스템으로 구축합니다.",
    text: "현장을 방문해 실제 업무를 확인한 뒤 Web·App·Windows 업무 시스템과 자동화를 기업별로 설계합니다.",
    points: ["현장 확인 후 맞춤 설계", "유료 맞춤 구축", "개발·배포·운영관리"],
    href: "/business",
    action: "WORKCRAFT 자세히 보기",
    tone: "workcraft",
    external: false,
  },
  {
    eyebrow: "DELIVERY OPERATIONS",
    name: "DELIVO",
    title: "택배회사와 기사의 운영을 하나의 흐름으로 연결합니다.",
    text: "기사·관리자, 근무표, 휴무, 노선, 수량, 정산, 공지와 채팅을 회사용·기사용 앱과 웹으로 연결하는 택배 운영 플랫폼입니다.",
    points: ["회사앱·기사앱", "용차·구인구직 확장", "구독형 운영 플랫폼"],
    href: "https://delivo.bgkcogito.co.kr",
    action: "DELIVO 공식 홈페이지",
    tone: "delivo",
    external: true,
  },
  {
    eyebrow: "VETERINARY CARE",
    name: "PAWU",
    title: "병원과 보호자가 진료 전후의 정보를 함께 이어갑니다.",
    text: "예약, 전자차트, 처방, 입원경과, 채팅, 알림과 반려동물 건강기록을 병원 업무 시스템과 보호자 서비스로 연결합니다.",
    points: ["병원용 업무 시스템", "보호자 서비스", "기존 시스템과 병행 운영"],
    href: "https://pawu.bgkcogito.co.kr",
    action: "PAWU 공식 홈페이지",
    tone: "pawu",
    external: true,
    guardianInstallPending: true,
  },
];

const operatingSteps = [
  ["01", "문제 확인", "현장과 사용자의 실제 업무 순서를 먼저 봅니다."],
  ["02", "구조 설계", "데이터, 권한, 승인, 알림과 화면 흐름을 정리합니다."],
  ["03", "직접 구현", "Web·App·Windows 업무 시스템을 하나의 운영 구조로 개발합니다."],
  ["04", "운영 개선", "배포 후 오류 대응, 기능 개선과 추가 개발을 이어갑니다."],
];

const trustStandards = [
  {
    label: "01 · SCOPE",
    title: "범위를 먼저 문서화합니다.",
    text: "개발 전에 견적, 포함 기능, 제외 범위와 검수 기준을 문서로 확정합니다.",
  },
  {
    label: "02 · BUILD",
    title: "기획부터 배포까지 직접 수행합니다.",
    text: "외주 중개가 아니라 BGK가 서비스 구조 설계, 개발, 배포와 운영 개선을 직접 진행합니다.",
  },
  {
    label: "03 · OPERATION",
    title: "실제 운영을 기준으로 설계합니다.",
    text: "화면 수보다 업무 흐름, 권한, 데이터와 반복 작업이 실제로 줄어드는지를 우선합니다.",
  },
  {
    label: "04 · TRANSPARENCY",
    title: "비용과 변경 절차를 투명하게 안내합니다.",
    text: "계약 범위를 벗어난 추가 작업은 사유, 금액과 일정을 먼저 안내하고 동의 후 진행합니다.",
  },
];

export default function Home() {
  return (
    <main id="top" className="home-page bgk2-home">
      <Header />

      <section className="bgk2-hero">
        <div className="hero-grid-pattern" aria-hidden="true" />
        <div className="shell bgk2-hero-grid">
          <div className="bgk2-hero-copy">
            <p className="kicker kicker-light">BGK BUSINESS TECHNOLOGY</p>
            <h1>
              현장의 업무를 이해하고,
              <br />
              <span>실제로 쓰이는 시스템을 만듭니다.</span>
            </h1>
            <p>
              BGK는 기업 맞춤 구축 서비스 WORKCRAFT와 자체 제품 DELIVO·PAWU를 개발·운영합니다.
              업무 구조를 정리하고 필요한 시스템을 설계해 개발, 배포와 운영 개선까지 직접 이어갑니다.
            </p>
            <div className="hero-buttons">
              <Link className="button button-primary" href="/business">WORKCRAFT 자세히 보기</Link>
              <a className="button button-ghost-light" href="#services">BGK 사업 보기</a>
            </div>
            <div className="bgk2-hero-facts">
              <div><strong>3</strong><span>사업 라인</span></div>
              <div><strong>4</strong><span>구축 단계</span></div>
              <div><strong>직접</strong><span>기획·개발·운영</span></div>
            </div>
          </div>

          <aside className="bgk2-hero-card">
            <div className="bgk2-logo-wrap">
              <Image src="/images/bgk-blue.png" alt="BGK" fill priority sizes="(max-width: 900px) 80vw, 34vw" className="contain" />
            </div>
            <p>BUILD WHAT WORKS</p>
            <h2>보여주기 위한 기술보다<br />실제로 작동하는 결과물.</h2>
            <div className="bgk2-capability-tags">
              <span>WEB</span><span>APP</span><span>WINDOWS</span><span>AI</span><span>DB</span><span>OPERATIONS</span>
            </div>
          </aside>
        </div>
      </section>

      {workcraftPromotionOpen && (
        <section className="bgk2-home-promo" aria-label="WORKCRAFT 출시 프로모션">
          <div className="shell bgk2-home-promo-grid">
            <div className="bgk2-home-promo-copy">
              <span className="bgk2-home-promo-label">WORKCRAFT 출시 프로모션</span>
              <h2>{workcraftPromotion.title}</h2>
              <strong>{workcraftPromotion.benefit}</strong>
              <p>
                유료 맞춤 구축 계약 기업을 대상으로, 최종 계약서에 포함되는 추가 기능 1개의 BGK 개발비를 지원합니다.
                기본 구축 패키지 비용 전체를 무료로 제공하는 프로모션은 아니며, 제외 항목은 명확하게 고지합니다.
              </p>
              <div className="bgk2-home-promo-points">
                {workcraftPromotion.eligibility.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <aside className="bgk2-home-promo-count">
              <span>현재 남은 프로모션</span>
              <div><strong>{workcraftPromotion.remainingSlots}</strong><em>/ {workcraftPromotion.totalSlots}개 기업</em></div>
              <p>계약서 체결 및 계약금 확인 순서로 차감됩니다.</p>
              <Link className="button button-primary" href="/business">프로모션 상세 보기</Link>
            </aside>
          </div>
          <div className="shell bgk2-home-promo-note">
            <b>제외 항목</b>
            <p>기본 구축 패키지 비용, 월 유지관리비, 제3자 비용, 표준 범위를 넘어서는 별도 맞춤 요구사항, 장거리 현장진단 실비, 다른 할인과의 중복 적용은 제외됩니다.</p>
          </div>
        </section>
      )}

      <section className="credential-bar">
        <div className="shell credential-grid">
          <div><span>COMPANY</span><strong>비지케이(BGK)</strong></div>
          <div><span>REPRESENTATIVE</span><strong>{site.representative}</strong></div>
          <div><span>BUSINESS NO.</span><strong>{site.businessNumber}</strong></div>
          <div><span>BUILD RANGE</span><strong>WEB · APP · WINDOWS · AI</strong></div>
        </div>
      </section>

      <section id="about" className="corporate-section shell bgk2-about">
        <Reveal>
          <div className="section-intro split-intro">
            <div>
              <p className="kicker">WHAT BGK DOES</p>
              <h2>두 가지 방식으로<br />기업의 문제를 해결합니다.</h2>
            </div>
            <p>
              고객사에 필요한 시스템은 현장에서 맞춤 구축하고, 특정 산업에서 반복되는 문제는 BGK의 자체 제품으로 운영합니다.
              서로 다른 사업처럼 보이지만 설계·개발·운영 경험은 하나의 기술 역량으로 축적됩니다.
            </p>
          </div>
          <div className="bgk2-model-grid">
            <article>
              <span>01 · CUSTOM BUILD</span>
              <h3>기업 맞춤 구축</h3>
              <p>회사가 실제로 일하는 방식에 맞춰 시스템을 설계하고 구축합니다.</p>
              <ul><li>WORKCRAFT 현장진단</li><li>Web·App·Windows 업무 시스템 통합 개발</li><li>운영·유지관리</li></ul>
            </article>
            <article>
              <span>02 · OWN PRODUCTS</span>
              <h3>자체 제품 운영</h3>
              <p>산업 현장에서 반복되는 문제를 제품으로 만들고 지속적으로 개선합니다.</p>
              <ul><li>DELIVO 택배 운영</li><li>PAWU 반려동물 의료 연결</li><li>실사용 기반 제품 개선</li></ul>
            </article>
          </div>
        </Reveal>
      </section>

      <section id="services" className="corporate-section bgk2-services">
        <div className="shell">
          <Reveal>
            <div className="section-intro centered narrow">
              <p className="kicker">BGK BUSINESS</p>
              <h2>각 사업이 해결하는 문제를<br />명확하게 구분했습니다.</h2>
              <p>고객이 필요한 서비스와 제품을 바로 찾을 수 있도록 핵심만 간결하게 정리했습니다.</p>
            </div>
            <div className="bgk2-service-grid">
              {serviceLines.map((item) => (
                <article className={`bgk2-service-card ${item.tone}`} key={item.name}>
                  <div className="bgk2-service-head">
                    <span>{item.eyebrow}</span>
                    <b>{item.name}</b>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  {"guardianInstallPending" in item && item.guardianInstallPending ? (
                    <div className="pawu-install-actions">
                      <button type="button" className="pawu-install-pending" disabled>Google Play 보호자 앱 설치 · 출시 준비중</button>
                      <a href={item.href} target="_blank" rel="noreferrer">PAWU 서비스 소개 →</a>
                    </div>
                  ) : item.external ? (
                    <a href={item.href} target="_blank" rel="noreferrer">{item.action} →</a>
                  ) : (
                    <Link href={item.href}>{item.action} →</Link>
                  )}
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="corporate-section bgk2-trust-section" aria-label="BGK 프로젝트 운영 기준">
        <div className="shell">
          <Reveal>
            <div className="bgk2-trust-head">
              <div>
                <p className="kicker kicker-light">HOW BGK BUILDS TRUST</p>
                <h2>회사 소개보다 중요한 건,
                  <br />프로젝트를 어떻게 진행하는지입니다.</h2>
              </div>
              <p>
                BGK는 과장된 실적 수치 대신 고객이 계약 전에 확인할 수 있는 범위, 책임, 비용과 진행 절차를 명확하게 안내합니다.
                WORKCRAFT와 자체 제품 모두 같은 개발 원칙을 적용합니다.
              </p>
            </div>
            <div className="bgk2-trust-grid">
              {trustStandards.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <div className="bgk2-trust-foot">
              <div><span>법적 사업자</span><strong>비지케이(BGK)</strong></div>
              <div><span>대표</span><strong>{site.representative}</strong></div>
              <div><span>사업자등록번호</span><strong>{site.businessNumber}</strong></div>
              <div><span>서비스 범위</span><strong>Web · App · Windows · AI</strong></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="principles" className="corporate-section shell bgk2-process">
        <Reveal>
          <div className="section-intro split-intro">
            <div><p className="kicker">HOW WE WORK</p><h2>신뢰는 화려한 문구보다<br />진행 방식에서 만들어집니다.</h2></div>
            <p>업무를 확인하고, 범위를 문서로 정리하고, 직접 개발한 뒤 실제 운영에서 개선합니다.</p>
          </div>
          <div className="bgk2-process-grid">
            {operatingSteps.map(([number, title, text]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
          <div className="quality-limit-banner">
            <div><p className="kicker">QUALITY CAPACITY</p><h3>매월 현장진단 최대 8개사 · 신규 구축 최대 3개사</h3></div>
            <p>수주량보다 완성도를 우선하고, 한 프로젝트가 실제 업무에서 작동할 때까지 충분한 시간을 투입합니다.</p>
          </div>
        </Reveal>
      </section>

      <section id="founder" className="corporate-section founder-section bgk2-founder">
        <div className="shell founder-corporate-grid">
          <Reveal className="founder-image-card">
            <Image src="/images/founder.png" alt="BGK 대표 장수빈" fill sizes="(max-width: 900px) 90vw, 34vw" className="cover" />
          </Reveal>
          <Reveal className="founder-corporate-copy">
            <p className="kicker">FOUNDER & CEO</p>
            <h2>현장을 경험한 사람이<br />현장을 위한 시스템을 만듭니다.</h2>
            <p>
              택배기사와 현장 관리 업무를 직접 경험하며 반복되는 확인, 배정, 정산과 소통의 비효율을 체감했습니다.
              BGK는 그 문제를 아이디어에 머물게 하지 않고 DELIVO, PAWU와 기업 맞춤 시스템으로 구현합니다.
            </p>
            <blockquote>“많이 만드는 것보다, 실제로 계속 쓰이는 시스템을 만들겠습니다.”</blockquote>
            <div className="founder-signature"><strong>{site.representative}</strong><span>Founder & CEO · BGK</span></div>
          </Reveal>
        </div>
      </section>

      <section className="corporate-section shell bgk2-final-contact">
        <Reveal>
          <div className="bgk2-final-contact-panel">
            <div>
              <p className="kicker kicker-light">START WITH THE RIGHT SERVICE</p>
              <h2>필요한 사업을 선택해
                <br />상세 내용을 확인하세요.</h2>
              <p>기업 맞춤 구축은 WORKCRAFT에서, 택배 운영은 DELIVO에서, 반려동물 의료 연결은 PAWU에서 확인할 수 있습니다.</p>
            </div>
            <div className="bgk2-final-links">
              <Link href="/business"><strong>WORKCRAFT</strong><span>기업 맞춤 시스템 구축</span><b>자세히 보기 →</b></Link>
              <a href="https://delivo.bgkcogito.co.kr" target="_blank" rel="noreferrer"><strong>DELIVO</strong><span>택배 운영 플랫폼</span><b>공식 홈페이지 →</b></a>
              <a href="https://pawu.bgkcogito.co.kr" target="_blank" rel="noreferrer"><strong>PAWU</strong><span>반려동물 의료 연결</span><b>서비스 소개 →</b></a>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="corporate-footer shell">
        <div><a className="footer-logo" href="#top">BGK</a><p>현장의 문제를 매일 쓰는 시스템으로 만듭니다.</p></div>
        <dl>
          <div><dt>대표</dt><dd>{site.representative}</dd></div>
          <div><dt>사업자등록번호</dt><dd>{site.businessNumber}</dd></div>
          <div><dt>행정 문의</dt><dd>{site.email}</dd></div>
          <div><dt>주소</dt><dd>{site.address}</dd></div>
        </dl>
        <div className="footer-links">
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/business">WORKCRAFT</Link>
          <a href="https://delivo.bgkcogito.co.kr" target="_blank" rel="noreferrer">DELIVO</a>
          <a href="https://pawu.bgkcogito.co.kr" target="_blank" rel="noreferrer">PAWU</a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} BGK. All rights reserved.</p>
      </footer>
    </main>
  );
}
