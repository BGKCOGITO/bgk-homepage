import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "BGK 공식 홈페이지 개인정보처리방침",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-shell">
        <Link className="legal-back" href="/">← BGK 홈페이지</Link>
        <p className="kicker">PRIVACY POLICY</p>
        <h1>개인정보처리방침</h1>
        <p className="legal-lead">BGK는 온라인 진단, 현장방문 일정 검토 및 서비스 운영에 필요한 개인정보를 관련 법령과 본 방침에 따라 처리합니다.</p>

        <section>
          <h2>1. 수집하는 개인정보 항목</h2>
          <p>BGK 공식 홈페이지는 사업 및 서비스 소개를 목적으로 운영합니다. WORKCRAFT 예상견적 발행 및 신청정보 입력은 별도 WORKCRAFT 전용 시스템에서 진행되며, 해당 과정에서 필요한 개인정보 수집·이용 안내와 동의를 별도로 제공합니다.</p>
        </section>
        <section>
          <h2>2. 개인정보 처리 목적</h2>
          <p>BGK 홈페이지에서 별도로 수집하는 정보가 있는 경우 해당 화면에서 목적과 보유기간을 안내합니다. WORKCRAFT 견적·계약 관련 정보는 WORKCRAFT 전용 시스템의 안내와 동의 기준에 따라 처리합니다.</p>
        </section>
        <section>
          <h2>3. 개인정보 보유 및 파기</h2>
          <p>현장진단 신청 정보는 처리 목적 달성 후 불필요해진 경우 지체 없이 파기합니다. 계약이 체결된 경우 계약·거래·세무 관련 자료는 관계 법령과 계약상 필요한 기간 동안 보관할 수 있습니다.</p>
        </section>
        <section>
          <h2>4. 개인정보 처리 위탁 및 외부 인프라</h2>
          <p>홈페이지 운영, 데이터 전송, 메일 접수 등을 위해 클라우드 호스팅, 데이터베이스, 메일 발송 등 외부 서비스를 사용할 수 있습니다. BGK는 필요한 범위에서만 정보를 처리하고 서비스 제공자의 보안 설정을 적용합니다.</p>
        </section>
        <section>
          <h2>5. 이용자의 권리</h2>
          <p>이용자는 본인의 개인정보에 대한 열람, 정정, 삭제 또는 처리정지를 요청할 수 있습니다. 다만 관계 법령 또는 계약상 보관 의무가 있는 경우 일부 처리가 제한될 수 있습니다.</p>
        </section>
        <section>
          <h2>6. 개인정보 보호 문의</h2>
          <dl className="legal-contact">
            <div><dt>상호</dt><dd>비지케이(BGK)</dd></div>
            <div><dt>대표자</dt><dd>{site.representative}</dd></div>
            <div><dt>이메일</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
            <div><dt>연락처</dt><dd><a href={`tel:${site.phone.replaceAll("-", "")}`}>{site.phone}</a></dd></div>
          </dl>
        </section>
        <p className="legal-date">시행일: 2026년 8월 17일</p>
      </div>
    </main>
  );
}
