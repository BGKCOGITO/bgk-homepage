import Image from "next/image";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export default function Home() {
  return (
    <main id="top">
      <Header />
      <section className="hero section-shell">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-copy">
          <p className="eyebrow">AI SOFTWARE COMPANY</p>
          <h1>현장의 문제를 기술로 해결하고,<br /><span>유일한 가치를 만듭니다.</span></h1>
          <p className="hero-text">BGK는 실제 산업 현장에서 필요한 소프트웨어를 직접 설계하고 개발합니다. 반려동물 의료와 물류 업무를 시작으로, 반복되는 불편을 자동화하고 지속 가능한 구독형 서비스로 확장합니다.</p>
          <div className="hero-actions">
            <a className="btn primary" href="#services">서비스 보기</a>
            <a className="btn secondary" href="#contact">문의하기</a>
          </div>
          <div className="hero-motto">Don&apos;t be the best. <strong>Be the only one.</strong></div>
        </div>
        <div className="hero-card">
          <Image src="/images/bgk-gold.png" alt="BGK 골드 로고" fill priority sizes="(max-width: 900px) 90vw, 44vw" className="cover contain" />
        </div>
      </section>

      <section id="about" className="section section-shell">
        <Reveal>
          <div className="section-heading">
            <p className="eyebrow">ABOUT BGK</p>
            <h2>기술을 위한 기술이 아니라,<br />사람과 현장을 위한 기술.</h2>
          </div>
          <div className="about-grid">
            <article className="glass large-card">
              <p>BGK는 택배 현장과 서비스 운영 경험에서 출발했습니다. 책상 위의 가정이 아니라 실제 사용자가 겪는 불편을 기준으로 제품을 설계합니다.</p>
              <p>우리는 AI를 장식적인 기능으로 사용하지 않습니다. 데이터 정리, 업무 자동화, 의사결정 보조처럼 사람이 더 중요한 일에 집중할 수 있도록 적용합니다.</p>
            </article>
            <div className="value-grid">
              {[
                ["01", "현장 중심", "실제 사용자의 업무 흐름을 먼저 이해합니다."],
                ["02", "실용적 AI", "보여주기보다 시간을 절약하는 AI를 만듭니다."],
                ["03", "지속 가능한 성장", "반복 매출과 안정적인 운영을 함께 설계합니다."],
                ["04", "유일한 해답", "비슷한 서비스보다 꼭 필요한 차이를 만듭니다."],
              ].map(([n, title, text]) => <article className="value-card" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="services" className="section section-shell services-section">
        <Reveal>
          <div className="section-heading centered">
            <p className="eyebrow">OUR SERVICES</p>
            <h2>산업의 불편을 새로운 기준으로 바꿉니다.</h2>
            <p>BGK가 직접 경험하고 검증한 문제에서 시작한 서비스입니다.</p>
          </div>
          <div className="service-grid">
            <article className="service-card pawu-card">
              <div className="service-top">
                <div className="service-logo white-logo"><Image src="/images/pawu.png" alt="PAWU 로고" fill className="contain" /></div>
                <div><span>Pet Healthcare Platform</span><h3>PAWU</h3></div>
              </div>
              <p>전국 동물병원 정보, 보호자 예약, 반려동물 건강 기록, 병원 업무 관리와 AI 의료보조를 하나로 연결하는 반려동물 의료 플랫폼입니다.</p>
              <ul><li>병원 검색 및 예약</li><li>전자차트와 입원 경과 공유</li><li>보호자 건강 기록과 알림</li><li>AI 기반 의료 업무 보조</li></ul>
              <span className="status">IN DEVELOPMENT</span>
            </article>
            <article className="service-card delivo-card">
              <div className="service-top">
                <div className="service-logo"><Image src="/images/delivo.png" alt="DELIVO 로고" fill className="contain" /></div>
                <div><span>Delivery Operations Platform</span><h3>DELIVO</h3></div>
              </div>
              <p>택배 회사와 배송기사의 근무표, 물량, 수입, 휴무, 공지와 업무 소통을 통합하는 실무 중심 배송 운영 플랫폼입니다.</p>
              <ul><li>회사·기사 업무 연동</li><li>달력 기반 근무 및 휴무 관리</li><li>수량·수입·지출 통계</li><li>구인구직과 기사몰 확장</li></ul>
              <span className="status">IN DEVELOPMENT</span>
            </article>
          </div>
        </Reveal>
      </section>

      <section id="founder" className="section section-shell">
        <Reveal className="founder-wrap">
          <div className="founder-photo">
            <Image src="/images/founder.png" alt="BGK 대표 장수빈" fill sizes="(max-width: 900px) 80vw, 32vw" className="cover" />
          </div>
          <article className="founder-copy glass">
            <p className="eyebrow">FOUNDER</p>
            <h2>장수빈 <small>Founder & CEO</small></h2>
            <p>택배기사와 관리 업무를 직접 경험하며, 현장에는 좋은 아이디어보다 실제로 작동하는 도구가 더 필요하다는 사실을 배웠습니다.</p>
            <p>BGK는 이러한 경험에서 출발했습니다. 작은 문제라도 반복된다면 기술로 해결하고, 하나의 산업에서 검증한 실행력을 다음 산업으로 넓혀가겠습니다.</p>
            <blockquote>“최고가 되는 것보다, 세상에 꼭 필요한 유일한 존재가 되겠습니다.”</blockquote>
          </article>
          <article id="vision" className="vision-card">
            <p className="eyebrow">OUR VISION</p>
            <h2>Become<br />Globally Known.</h2>
            <p>한국의 현장에서 시작한 실용적인 소프트웨어를 세계가 인정하는 서비스로 성장시키는 것이 BGK의 목표입니다.</p>
            <div className="vision-points"><span>AI</span><span>AUTOMATION</span><span>GLOBAL</span><span>IMPACT</span></div>
          </article>
        </Reveal>
      </section>

      <section id="contact" className="section section-shell contact-section">
        <Reveal>
          <div className="contact-card">
            <div>
              <p className="eyebrow">CONTACT BGK</p>
              <h2>새로운 가능성을<br />함께 만들겠습니다.</h2>
              <p>서비스 도입, 공동 개발, 투자 및 사업 제휴에 대해 편하게 연락해 주세요.</p>
            </div>
            <dl>
              <div><dt>PHONE</dt><dd><a href={`tel:${site.phone.replaceAll("-", "")}`}>{site.phone}</a></dd></div>
              <div><dt>EMAIL</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
              <div><dt>REPRESENTATIVE</dt><dd>{site.representative} · {site.title}</dd></div>
            </dl>
          </div>
        </Reveal>
      </section>

      <footer className="footer section-shell">
        <div className="footer-brand"><strong>BGK</strong><span>BECOME GLOBALLY KNOWN</span></div>
        <div className="business-info">
          <span>상호: 비지케이(BGK)</span><span>대표자: {site.representative}</span><span>사업자등록번호: {site.businessNumber}</span><span>업태·종목: {site.businessType}</span><span>사업장 소재지: {site.address}</span><span>연락처: {site.phone}</span><span>이메일: {site.email}</span>
        </div>
        <p className="copyright">© {new Date().getFullYear()} BGK. All rights reserved.</p>
      </footer>
    </main>
  );
}
