import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

const businessLines = [
  {
    label: "ENTERPRISE BUILD",
    title: "WORKCRAFT",
    text: "기업의 실제 업무를 현장에서 확인하고 Web·App·PC 프로그램과 AI 자동화를 맞춤 구축합니다.",
    href: "/business",
    link: "현장진단·예상견적 보기",
    tone: "workcraft",
  },
  {
    label: "DELIVERY OPERATIONS",
    title: "DELIVO",
    text: "택배회사와 배송기사의 근무·노선·수량·정산·공지·채팅을 하나로 연결하는 B2B SaaS입니다.",
    href: "https://delivo-eight.vercel.app",
    link: "DELIVO 보기",
    tone: "delivo",
  },
  {
    label: "VETERINARY PLATFORM",
    title: "PAWU",
    text: "동물병원과 보호자의 예약·진료기록·처방·입원·건강관리를 연결하는 반려동물 의료 플랫폼입니다.",
    href: "https://pawu-web.vercel.app",
    link: "PAWU 보기",
    tone: "pawu",
  },
];

const principles = [
  ["01", "현장 중심", "사용자가 실제로 일하는 순서와 반복되는 불편을 먼저 확인합니다."],
  ["02", "직접 구축", "기획만 전달하지 않고 웹·앱·프로그램을 직접 설계하고 구현합니다."],
  ["03", "명확한 범위", "최종 견적서와 개발범위서로 포함·제외 기능과 검수 기준을 문서화합니다."],
  ["04", "지속 운영", "배포 이후 장애 대응, 개선, 추가 개발과 운영관리까지 이어갑니다."],
];

const workcraftSteps = [
  ["온라인 진단", "구축 단계와 필요한 기능을 선택합니다."],
  ["예상 견적", "평균 구축비와 예상 기간을 확인합니다."],
  ["현장진단", "실제 업무자료와 담당자의 흐름을 확인합니다."],
  ["최종 견적·계약", "범위·금액·일정·검수기준을 확정합니다."],
  ["개발·배포", "검수 후 운영환경에 배포하고 관리합니다."],
];

export default function Home() {
  return (
    <main id="top" className="home-page">
      <Header />

      <section className="home-hero">
        <div className="hero-grid-pattern" aria-hidden="true" />
        <div className="shell home-hero-grid">
          <div className="home-hero-copy">
            <p className="kicker kicker-light">BGK · BUSINESS TECHNOLOGY COMPANY</p>
            <h1>현장을 이해하고,<br /><span>작동하는 시스템을 구축합니다.</span></h1>
            <p className="home-hero-description">
              BGK는 기업의 반복업무와 산업 현장의 문제를 Web·App·PC 프로그램과 AI 자동화로 해결합니다.
              기획부터 개발, 배포, 운영까지 직접 수행하며 보여주기 위한 기술보다 실제 업무성과를 만드는 시스템을 지향합니다.
            </p>
            <div className="hero-buttons">
              <Link className="button button-primary" href="/business#diagnosis">WORKCRAFT 온라인 진단</Link>
              <a className="button button-ghost-light" href="#business-lines">사업영역 보기</a>
            </div>
            <div className="hero-proof-row">
              <div><span>01</span><p>현장진단</p></div>
              <div><span>02</span><p>직접 설계·개발</p></div>
              <div><span>03</span><p>배포·운영</p></div>
              <div><span>04</span><p>제한 수주·품질관리</p></div>
            </div>
          </div>

          <div className="hero-brand-panel">
            <div className="hero-brand-image">
              <Image src="/images/bgk-blue.png" alt="BGK 로고" fill priority sizes="(max-width: 900px) 90vw, 38vw" className="contain" />
            </div>
            <div className="hero-brand-caption">
              <span>OUR STANDARD</span>
              <p>Don&apos;t be the best.<br /><strong>Be the only one.</strong></p>
            </div>
          </div>
        </div>
      </section>

      <section className="credential-bar">
        <div className="shell credential-grid">
          <div><span>COMPANY</span><strong>비지케이(BGK)</strong></div>
          <div><span>REPRESENTATIVE</span><strong>{site.representative}</strong></div>
          <div><span>BUSINESS NO.</span><strong>{site.businessNumber}</strong></div>
          <div><span>BUILD RANGE</span><strong>WEB · APP · PC · AI</strong></div>
        </div>
      </section>

      <section id="about" className="corporate-section shell">
        <Reveal>
          <div className="section-intro split-intro">
            <div><p className="kicker">ABOUT BGK</p><h2>문제를 설명하는 데서 끝나지 않고,<br />실제로 사용할 시스템을 만듭니다.</h2></div>
            <p>BGK는 현장의 경험에서 출발한 소프트웨어 기업입니다. 업무를 관찰하고 구조화한 뒤 사용자가 매일 사용할 수 있는 제품과 시스템으로 구현합니다.</p>
          </div>
          <div className="about-corporate-grid">
            <article className="about-statement">
              <span>BGK APPROACH</span>
              <h3>컨설팅을 위한 보고서보다<br />작동하는 결과물을 제공합니다.</h3>
              <p>기업 맞춤 구축사업 WORKCRAFT와 직접 운영하는 DELIVO·PAWU를 통해 기획, 데이터베이스, 권한, 알림, 결제, 배포와 운영 경험을 축적하고 있습니다.</p>
              <p>AI는 전면에 붙이는 장식이 아니라 반복업무를 줄이고 판단을 돕기 위한 실용적인 기능으로 적용합니다.</p>
            </article>
            <div className="about-capabilities">
              {[
                ["DISCOVERY", "현장 업무진단과 요구사항 구조화"],
                ["PRODUCT DESIGN", "화면·권한·업무흐름 설계"],
                ["ENGINEERING", "Web·App·PC 프로그램 직접 개발"],
                ["OPERATIONS", "배포·모니터링·유지관리·개선"],
              ].map(([title, text]) => <article key={title}><span>{title}</span><p>{text}</p></article>)}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="business-lines" className="corporate-section business-lines-section">
        <div className="shell">
          <Reveal>
            <div className="section-intro centered narrow">
              <p className="kicker">BUSINESS LINES</p>
              <h2>기업 맞춤 구축과 자체 제품을<br />하나의 기술 역량으로 연결합니다.</h2>
              <p>BGK는 고객사의 업무 시스템을 구축하는 WORKCRAFT와 산업별 SaaS 제품을 함께 운영합니다.</p>
            </div>
            <div className="business-line-grid">
              {businessLines.map((item) => (
                <article className={`business-line-card ${item.tone}`} key={item.title}>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>{item.link} →</a>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="corporate-section shell workcraft-highlight">
        <Reveal>
          <div className="workcraft-highlight-panel">
            <div className="workcraft-highlight-copy">
              <p className="kicker kicker-light">BGK WORKCRAFT</p>
              <h2>전화로 묻지 않습니다.<br />현장에서 보고 설계합니다.</h2>
              <p>현재 사용 중인 엑셀·카카오톡·수기 장부와 실제 담당자의 업무 순서를 직접 확인한 뒤 회사 방식에 맞는 시스템을 구축합니다.</p>
              <Link className="button button-primary" href="/business">온라인 진단·예상 견적 확인</Link>
            </div>
            <div className="workcraft-mini-process">
              {workcraftSteps.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="products" className="corporate-section product-section">
        <div className="shell">
          <Reveal>
            <div className="section-intro split-intro">
              <div><p className="kicker">PRODUCT EXECUTION</p><h2>직접 기획하고 운영하는<br />산업별 SaaS 제품.</h2></div>
              <p>제품을 직접 만들고 배포하는 경험은 기업 맞춤 시스템을 더 빠르고 안정적으로 구축하는 기반이 됩니다.</p>
            </div>
            <div className="product-grid">
              <article className="product-card delivo-product">
                <div className="product-logo"><Image src="/images/delivo.png" alt="DELIVO" fill className="contain" /></div>
                <div><span>DELIVERY OPERATIONS PLATFORM</span><h3>DELIVO</h3><p>택배회사와 기사의 근무표, 노선, 수량, 정산, 공지, 채팅을 연결하는 기업용 업무관리 서비스입니다.</p><ul><li>회사·기사 앱과 웹 연동</li><li>근무·휴무·노선 관리</li><li>운영통계·정산·알림</li></ul><a href="https://delivo-eight.vercel.app" target="_blank" rel="noreferrer">서비스 확인 →</a></div>
              </article>
              <article className="product-card pawu-product">
                <div className="product-logo"><Image src="/images/pawu.png" alt="PAWU" fill className="contain" /></div>
                <div><span>VETERINARY CARE PLATFORM</span><h3>PAWU</h3><p>동물병원과 보호자의 예약, 진료기록, 처방, 입원경과와 건강관리를 연결하는 반려동물 의료 플랫폼입니다.</p><ul><li>병원 프로그램·보호자 앱</li><li>예약·차트·처방·입원</li><li>알림·채팅·건강기록</li></ul><a href="https://pawu-web.vercel.app" target="_blank" rel="noreferrer">서비스 확인 →</a></div>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="principles" className="corporate-section shell">
        <Reveal>
          <div className="section-intro centered narrow">
            <p className="kicker">OPERATING PRINCIPLES</p>
            <h2>신뢰는 기능보다<br />진행 방식에서 만들어집니다.</h2>
          </div>
          <div className="principle-grid">
            {principles.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <div className="quality-limit-banner">
            <div><p className="kicker">QUALITY CAPACITY</p><h3>매월 현장진단 최대 8개사 · 신규 구축 최대 3개사</h3></div>
            <p>무리하게 프로젝트를 수주하지 않고 한 기업의 시스템이 실제로 작동할 때까지 충분한 시간을 투입합니다.</p>
          </div>
        </Reveal>
      </section>

      <section id="founder" className="corporate-section founder-section">
        <div className="shell founder-corporate-grid">
          <Reveal className="founder-image-card">
            <Image src="/images/founder.png" alt="BGK 대표 장수빈" fill sizes="(max-width: 900px) 90vw, 34vw" className="cover" />
          </Reveal>
          <Reveal className="founder-corporate-copy">
            <p className="kicker">FOUNDER & CEO</p>
            <h2>현장을 경험한 사람이<br />현장을 위한 시스템을 만듭니다.</h2>
            <p>택배기사와 현장 관리 업무를 직접 경험하며 반복되는 확인, 배정, 정산과 소통의 비효율을 체감했습니다. BGK는 책상 위의 가정보다 사용자가 실제로 처리하는 업무를 기준으로 설계합니다.</p>
            <p>한 번 만들고 끝나는 프로그램보다 고객의 업무와 함께 개선되는 시스템을 목표로 합니다.</p>
            <div className="founder-name"><strong>{site.representative}</strong><span>Founder & CEO</span></div>
            <blockquote>“최고를 따라가기보다, 현장에 꼭 필요한 유일한 시스템을 만들겠습니다.”</blockquote>
          </Reveal>
        </div>
      </section>

      <section className="corporate-section shell final-cta-section">
        <Reveal>
          <div className="final-cta-panel">
            <div><p className="kicker kicker-light">START WITH DIAGNOSIS</p><h2>현재 업무를 온라인으로 진단하고<br />예상 견적부터 확인하세요.</h2><p>요구사항을 전화로 길게 설명할 필요가 없습니다. 필요한 범위를 선택한 뒤 현장진단을 신청하면 BGK가 실제 업무를 확인합니다.</p></div>
            <Link className="button button-primary" href="/business#diagnosis">WORKCRAFT 온라인 진단 시작</Link>
          </div>
        </Reveal>
      </section>

      <footer className="corporate-footer shell">
        <div><a className="footer-logo" href="#top">BGK</a><p>현장을 이해하고, 작동하는 시스템을 구축합니다.</p></div>
        <dl>
          <div><dt>대표</dt><dd>{site.representative}</dd></div>
          <div><dt>사업자등록번호</dt><dd>{site.businessNumber}</dd></div>
          <div><dt>행정 문의</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
          <div><dt>주소</dt><dd>{site.address}</dd></div>
        </dl>
        <div className="footer-links"><Link href="/privacy">개인정보처리방침</Link><Link href="/business">WORKCRAFT</Link></div>
        <p className="copyright">© {new Date().getFullYear()} BGK. All rights reserved.</p>
      </footer>
    </main>
  );
}
