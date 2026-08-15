import Image from "next/image";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

const pawuFeatures = ["전국 동물병원 정보와 예약", "전자차트·입원 경과 공유", "보호자 건강 기록과 알림", "AI 기반 의료 업무 보조"];
const delivoFeatures = ["회사·기사 업무 연동", "달력 기반 근무·휴무 관리", "수량·수입·지출 통계", "구인구직·기사몰 확장"];

export default function Home() {
  return (
    <main id="top">
      <Header />

      <section className="hero section-shell">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="particle particle-one" />
        <div className="particle particle-two" />
        <div className="particle particle-three" />

        <div className="hero-copy">
          <p className="eyebrow">PRACTICAL AI SOFTWARE COMPANY</p>
          <h1>
            산업을 바꾸는 AI를 만들고,
            <br />
            <span>현장에서 증명합니다.</span>
          </h1>
          <p className="hero-text">
            BGK는 반려동물 의료와 물류 현장에서 반복되는 문제를 소프트웨어와 AI로 해결합니다.
            보여주기 위한 기술이 아니라, 실제 업무 시간을 줄이고 새로운 가치를 만드는 서비스를 개발합니다.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#services">서비스 보기</a>
            <a className="btn secondary" href="#contact">협업 문의</a>
          </div>
          <div className="hero-motto">
            Don&apos;t be the best. <strong>Be the only one.</strong>
          </div>
        </div>

        <div className="hero-card" aria-label="BGK 브랜드 로고">
          <Image
            src="/images/bgk-gold.png"
            alt="BGK 골드 로고"
            fill
            priority
            sizes="(max-width: 900px) 90vw, 44vw"
            className="cover contain"
          />
          <div className="hero-card-line" />
        </div>
      </section>

      <section id="about" className="section section-shell">
        <Reveal>
          <div className="section-heading">
            <p className="eyebrow">ABOUT BGK</p>
            <h2>기술을 위한 기술이 아니라,<br />사람과 현장을 위한 기술.</h2>
            <p>
              BGK는 의료, 물류, 업무 자동화처럼 실제 산업에서 바로 사용할 수 있는 AI 기반 소프트웨어를 연구하고 개발합니다.
            </p>
          </div>

          <div className="about-grid">
            <article className="glass large-card">
              <p>
                BGK는 택배기사와 현장 관리 경험에서 출발했습니다. 책상 위의 가정이 아니라 사용자가 매일 반복해서 겪는 불편을 기준으로 제품을 설계합니다.
              </p>
              <p>
                우리는 AI를 장식적인 기능으로 사용하지 않습니다. 데이터 정리, 업무 자동화, 의사결정 보조처럼 사람이 더 중요한 일에 집중하도록 돕는 기술을 만듭니다.
              </p>
              <p>
                작은 문제라도 반복된다면 해결할 가치가 있습니다. 하나의 산업에서 검증한 실행력을 다음 산업으로 확장해 지속 가능한 소프트웨어 기업으로 성장하겠습니다.
              </p>
            </article>

            <div className="value-grid">
              {[
                ["01", "현장 중심", "실제 사용자의 업무 흐름을 먼저 이해합니다."],
                ["02", "실용적 AI", "화려함보다 시간을 절약하고 판단을 돕는 AI를 만듭니다."],
                ["03", "지속 가능한 성장", "구독형 서비스와 안정적인 운영 구조를 함께 설계합니다."],
                ["04", "유일한 해답", "비슷한 서비스를 따라가기보다 꼭 필요한 차이를 만듭니다."],
              ].map(([n, title, text]) => (
                <article className="value-card" key={n}>
                  <span>{n}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="services" className="section section-shell services-section">
        <Reveal>
          <div className="section-heading centered">
            <p className="eyebrow">OUR SERVICES</p>
            <h2>실제 산업의 불편을 새로운 기준으로 바꿉니다.</h2>
            <p>직접 경험하고 검증한 문제에서 출발한 BGK의 핵심 서비스입니다.</p>
          </div>

          <div className="custom-saas-banner">
            <div><span>BGK CUSTOM BUSINESS SaaS</span><h3>우리 회사 업무에 맞는 Web · App · PC 프로그램이 필요하신가요?</h3><p>QR 출퇴근, 연차·휴무, 급여·정산, 직원관리, 채팅·공지부터 기업별 맞춤 기능까지 구축합니다.</p></div>
            <a className="btn primary" href="/business">기업 맞춤 개발 보기</a>
          </div>

          <div className="service-grid">
            <article className="service-card pawu-card">
              <div className="service-top">
                <div className="service-logo white-logo">
                  <Image src="/images/pawu.png" alt="PAWU 로고" fill className="contain" />
                </div>
                <div><span>AI VETERINARY PLATFORM</span><h3>PAWU</h3></div>
              </div>
              <p>
                동물병원과 보호자를 하나로 연결하고, 예약부터 진료 기록·입원 경과·AI 의료보조까지 통합하는 반려동물 의료 플랫폼입니다.
              </p>
              <ul>{pawuFeatures.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <div className="service-footer"><span className="status">BETA</span><span className="service-note">병원 운영과 보호자 경험을 동시에 개선</span><a className="service-link" href="https://pawu-web.vercel.app" target="_blank" rel="noreferrer">PAWU 바로가기 →</a></div>
            </article>

            <article className="service-card delivo-card">
              <div className="service-top">
                <div className="service-logo">
                  <Image src="/images/delivo.png" alt="DELIVO 로고" fill className="contain" />
                </div>
                <div><span>DELIVERY OPERATIONS PLATFORM</span><h3>DELIVO</h3></div>
              </div>
              <p>
                택배 회사와 배송기사의 근무표, 물량, 수입, 휴무, 공지와 소통을 하나로 통합하는 현장 중심 배송 업무 플랫폼입니다.
              </p>
              <ul>{delivoFeatures.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <div className="service-footer"><span className="status">IN DEVELOPMENT</span><span className="service-note">현장 경험에서 시작한 실무형 SaaS</span></div>
            </article>
          </div>
        </Reveal>
      </section>

      <section id="future" className="section section-shell future-section">
        <Reveal>
          <div className="future-panel">
            <div>
              <p className="eyebrow">WHAT COMES NEXT</p>
              <h2>두 개의 서비스에서 멈추지 않습니다.</h2>
              <p>
                BGK는 산업별 반복 업무를 줄이는 AI 자동화와 구독형 SaaS를 지속적으로 개발합니다. 새로운 서비스는 검증된 문제와 명확한 사용자 가치에서 시작합니다.
              </p>
            </div>
            <div className="future-grid">
              {["AI AUTOMATION", "BUSINESS SaaS", "DATA INTELLIGENCE", "GLOBAL PRODUCTS"].map((item, index) => (
                <div className="future-chip" key={item}><span>0{index + 1}</span>{item}</div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="founder" className="section section-shell">
        <Reveal className="founder-wrap">
          <div className="founder-photo">
            <Image
              src="/images/founder.png"
              alt="BGK 대표 장수빈"
              fill
              sizes="(max-width: 900px) 80vw, 28vw"
              className="cover"
            />
          </div>

          <article className="founder-copy glass">
            <p className="eyebrow">FOUNDER & CEO</p>
            <h2>장수빈 <small>BGK Founder & CEO</small></h2>
            <p>
              택배기사와 현장 관리 업무를 직접 경험하며, 현장에는 좋은 아이디어보다 실제로 작동하는 도구가 더 필요하다는 사실을 배웠습니다.
            </p>
            <p>
              BGK는 단순히 프로그램을 만드는 회사가 아닙니다. 사람들이 반복 업무에서 벗어나 더 중요한 판단과 관계에 집중할 수 있도록 돕는 회사를 목표로 합니다.
            </p>
            <blockquote>“최고를 따라가기보다, 세상에 꼭 필요한 유일한 서비스를 만들겠습니다.”</blockquote>
          </article>

          <article id="vision" className="vision-card">
            <p className="eyebrow">OUR VISION</p>
            <h2>Don&apos;t be the best.<br /><span>Be the only one.</span></h2>
            <p>
              최고의 회사를 목표로 하지 않습니다. 누구도 대신할 수 없는 실용적인 기술과 서비스로 세계가 기억하는 기업이 되겠습니다.
            </p>
            <div className="vision-signature">BECOME GLOBALLY KNOWN</div>
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
              <p>서비스 도입, 공동 개발, 투자 및 사업 제휴에 관심이 있다면 편하게 연락해 주세요.</p>
              <div className="contact-actions">
                <a className="btn primary" href={`mailto:${site.email}`}>이메일 문의</a>
                <a className="btn secondary" href={`tel:${site.phone.replaceAll("-", "")}`}>전화 문의</a>
              </div>
            </div>
            <dl>
              <div><dt>PHONE</dt><dd><a href={`tel:${site.phone.replaceAll("-", "")}`}>{site.phone}</a></dd></div>
              <div><dt>EMAIL</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
              <div><dt>REPRESENTATIVE</dt><dd>{site.representative} · {site.title}</dd></div>
              <div><dt>WEBSITE</dt><dd><a href="https://bgkcogito.co.kr">bgkcogito.co.kr</a></dd></div>
            </dl>
          </div>
        </Reveal>
      </section>

      <footer className="footer section-shell">
        <div className="footer-top">
          <div className="footer-brand"><strong>BGK</strong><span>BECOME GLOBALLY KNOWN</span></div>
          <p>현장에서 작동하는 실용적인 AI 소프트웨어를 만듭니다.</p>
        </div>
        <div className="business-info">
          <span>상호: 비지케이(BGK)</span><span>대표자: {site.representative}</span><span>사업자등록번호: {site.businessNumber}</span><span>업태·종목: {site.businessType}</span><span>사업장 소재지: {site.address}</span><span>연락처: {site.phone}</span><span>이메일: {site.email}</span>
        </div>
        <div className="footer-bottom"><p className="copyright">© {new Date().getFullYear()} BGK. All rights reserved.</p><nav className="footer-links" aria-label="정책"><a href="/privacy">개인정보처리방침</a><a href={`mailto:${site.email}`}>이메일 문의</a></nav></div>
      </footer>
    </main>
  );
}
