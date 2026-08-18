"use client";

import { FormEvent, useMemo, useState } from "react";
import WorkcraftPackageDemo, { type WorkcraftDemoId } from "@/components/WorkcraftPackageDemo";

type PlanId = "web" | "web-app" | "full";
type AddonCategoryId = "operations" | "workflow" | "integration";

type Plan = {
  id: PlanId;
  eyebrow: string;
  code: string;
  title: string;
  platform: string;
  price: number;
  description: string;
  example: string;
  includes: string[];
};

type Addon = {
  id: string;
  category: AddonCategoryId;
  title: string;
  description: string;
  price: number;
};

type PackageExample = {
  id: "core" | "connect" | "suite";
  planId: PlanId;
  label: string;
  title: string;
  description: string;
  addonIds: string[];
};

type IssuedQuote = {
  id: string;
  issuedAt: string;
  plan: Plan;
  addons: Addon[];
  average: number;
  min: number;
  max: number;
  duration: string;
};

const plans: Plan[] = [
  {
    id: "web",
    eyebrow: "PACKAGE 01",
    code: "WORKCRAFT CORE",
    title: "웹 업무시스템 구축형",
    platform: "Web",
    price: 390,
    description: "회사 내부 업무를 관리하는 반응형 Web과 관리자 시스템을 구축합니다.",
    example: "직원·현장·공지·기본 자료관리를 하나로 연결하는 사내 Web",
    includes: [
      "고객사 로고·대표색상 적용",
      "대표·관리자 이메일 로그인",
      "직원 사번·회사발급 ID 로그인",
      "대표·관리자·일반사용자 기본 권한",
      "기본 업무 모듈 1종",
      "검색·필터·표준 엑셀 다운로드",
      "운영 배포·30일 무상 하자보수",
    ],
  },
  {
    id: "web-app",
    eyebrow: "PACKAGE 02",
    code: "WORKCRAFT CONNECT",
    title: "웹·앱 현장 연결형",
    platform: "Web + Android App 1종",
    price: 690,
    description: "관리자 Web과 현장 직원·고객·기사용 Android App 1종을 연결합니다.",
    example: "DELIVO형 관리자 Web + 현장 사용자 App 1종의 연결 구조",
    includes: [
      "CORE 기본 구성 전체",
      "Android App 1종",
      "앱 아이콘·시작화면·고객사 브랜딩",
      "기본 푸시알림",
      "테스트 APK·서명 APK·AAB 제공",
      "내부 APK 배포 또는 Play 최초 등록 지원",
      "Web·App 통합 데이터 연동",
    ],
  },
  {
    id: "full",
    eyebrow: "PACKAGE 03",
    code: "WORKCRAFT SUITE",
    title: "웹·앱·PC 통합 운영형",
    platform: "Web + Android App 1종 + Windows Program 1종",
    price: 990,
    description: "Web·모바일 App·Windows Program을 하나의 데이터와 권한으로 연결합니다.",
    example: "PAWU형 관리자 Web + 사용자 App + 업무용 PC Program 연결 구조",
    includes: [
      "CONNECT 기본 구성 전체",
      "Windows PC Program 1종",
      "설치파일·PC 아이콘·시작화면",
      "Web·App·PC 통합 데이터베이스",
      "통합 로그인·권한·업무흐름",
      "버전·배포 환경 구성",
      "운영 배포·30일 무상 하자보수",
    ],
  },
];

const addonCategories: { id: AddonCategoryId; title: string; description: string }[] = [
  { id: "operations", title: "인사·현장·정산", description: "직원과 현장의 반복 운영업무를 시스템으로 전환합니다." },
  { id: "workflow", title: "재고·문서·업무관리", description: "입출고, 문서, 거래처와 내부 협업을 하나의 흐름으로 연결합니다." },
  { id: "integration", title: "알림·연동·고급기능", description: "결제, 외부서비스, AI와 확장 운영환경을 연결합니다." },
];

const addons: Addon[] = [
  { id: "organization", category: "operations", title: "직원·조직·세부 권한", description: "부서·팀·직책별 접근 권한과 관리자 범위 설정", price: 150 },
  { id: "attendance", category: "operations", title: "QR 출퇴근", description: "QR 스캔 기반 출퇴근, 근무시간·지각·조퇴 기록", price: 180 },
  { id: "leave", category: "operations", title: "연차·휴무 신청 승인", description: "연차 생성, 신청, 승인·반려와 잔여일 관리", price: 150 },
  { id: "assignment", category: "operations", title: "현장·업무·직원 배정", description: "현장별 담당자, 일정, 상태와 완료 여부 관리", price: 200 },
  { id: "settlement", category: "operations", title: "급여·수당·정산", description: "기본급·인센티브·수당·공제 계산과 월 정산", price: 280 },
  { id: "statement", category: "operations", title: "명세서·정산서 PDF", description: "급여명세서 또는 정산서를 PDF로 자동 생성", price: 120 },

  { id: "inventory", category: "workflow", title: "재고·입출고 기본관리", description: "품목, 입고·출고, 현재고, 안전재고 알림과 표준 엑셀", price: 320 },
  { id: "inventory-advanced", category: "workflow", title: "바코드·다중창고·LOT 추적", description: "바코드/QR 스캔, 창고별 재고, LOT·시리얼 이력", price: 250 },
  { id: "document", category: "workflow", title: "전자문서·결재·보관", description: "반복 문서 작성, 승인선, 상태와 문서 이력 관리", price: 220 },
  { id: "notice", category: "workflow", title: "공지·업무지시·확인", description: "공지 등록, 대상 지정, 확인 여부와 업무 체크", price: 120 },
  { id: "chat", category: "workflow", title: "사내 채팅·파일 전송", description: "실시간 업무 채팅방, 사진·문서 첨부와 참여자 권한", price: 350 },
  { id: "dashboard", category: "workflow", title: "운영통계·대시보드", description: "기간별 현황, 비교 지표와 표준 엑셀 다운로드", price: 180 },
  { id: "calendar", category: "workflow", title: "예약·일정·캘린더", description: "예약 가능시간, 일정 배정과 진행상태 관리", price: 200 },
  { id: "crm", category: "workflow", title: "고객·거래처 관리(CRM)", description: "고객·거래처 정보, 상담 이력, 상태와 담당자 관리", price: 200 },
  { id: "order", category: "workflow", title: "견적·발주·주문 관리", description: "견적서, 발주, 주문 상태와 거래처별 진행 관리", price: 250 },

  { id: "push", category: "integration", title: "푸시알림·화면 바로가기", description: "주요 이벤트 알림과 해당 업무 화면 이동", price: 120 },
  { id: "billing", category: "integration", title: "결제·구독관리 연동", description: "결제수단 등록, 승인·실패·해지·갱신 상태 관리", price: 320 },
  { id: "social", category: "integration", title: "소셜 로그인 1종", description: "Google·Kakao·Naver 중 1개 로그인 연동", price: 80 },
  { id: "messaging", category: "integration", title: "문자·알림톡 연동", description: "인증번호, 일정, 상태 안내 문자 또는 알림톡 발송", price: 120 },
  { id: "api", category: "integration", title: "외부 API 연동 1종", description: "외부 서비스·공공데이터·사내 시스템 API 연결", price: 180 },
  { id: "location", category: "integration", title: "지도·위치·현장 체크인", description: "지도 표시, 위치 기반 현장 확인과 방문 기록", price: 200 },
  { id: "migration", category: "integration", title: "기존 데이터 이전", description: "엑셀·시트·문서의 고객·직원·업무자료 정리·이전", price: 200 },
  { id: "ai", category: "integration", title: "AI 요약·분류·문서 초안", description: "업무내용 요약, 자동 분류 또는 문서 초안 생성", price: 300 },
  { id: "additional-os", category: "integration", title: "추가 앱·운영체제 1종", description: "기본 Android App 1종 외 iOS 또는 별도 App 추가", price: 350 },
  { id: "multi-company", category: "integration", title: "여러 회사·지점 분리관리", description: "법인·지점별 데이터, 권한과 통계 분리", price: 350 },
  { id: "audit", category: "integration", title: "고급 로그·보안·승인이력", description: "주요 작업 기록, 승인 이력과 보안 정책 강화", price: 250 },
];

const packageExamples: PackageExample[] = [
  {
    id: "core",
    planId: "web",
    label: "CORE EXAMPLE",
    title: "사내 근태·소통 관리 Web",
    description: "관리자와 직원이 브라우저에서 출퇴근 기록과 사내 업무소통을 함께 관리하는 구성입니다.",
    addonIds: ["attendance", "chat", "social"],
  },
  {
    id: "connect",
    planId: "web-app",
    label: "CONNECT EXAMPLE",
    title: "현장 인력 운영 Web + App",
    description: "관리자는 Web에서 현장과 직원을 관리하고, 직원은 App에서 출퇴근·휴무·배정업무를 확인합니다.",
    addonIds: ["organization", "attendance", "leave", "assignment", "push"],
  },
  {
    id: "suite",
    planId: "full",
    label: "SUITE EXAMPLE",
    title: "재고·발주·문서 통합 운영",
    description: "사무실 Web, 현장 App, Windows Program을 하나의 데이터로 연결하는 통합 구성입니다.",
    addonIds: ["inventory", "inventory-advanced", "document", "order", "dashboard"],
  },
];

function PackageMockup({ variant }: { variant: PackageExample["id"] }) {
  if (variant === "core") {
    return (
      <div className="package-mockup package-mockup-core" aria-label="사내 근태·소통 관리 웹 화면 예시">
        <div className="mock-browser-bar"><i /><i /><i /><span>WORKCRAFT · 사내 운영관리</span></div>
        <div className="mock-web-shell">
          <aside className="mock-sidebar">
            <b>ACME</b>
            <span className="active">대시보드</span><span>출퇴근</span><span>사내채팅</span><span>직원관리</span>
          </aside>
          <div className="mock-dashboard">
            <div className="mock-dashboard-head"><div><small>오늘의 운영현황</small><strong>근태 대시보드</strong></div><em>관리자</em></div>
            <div className="mock-stat-row"><div><small>출근</small><b>28</b></div><div><small>지각</small><b>2</b></div><div><small>미출근</small><b>1</b></div></div>
            <div className="mock-core-bottom">
              <div className="mock-table"><span>직원</span><span>출근시간</span><span>상태</span><b>김현우</b><b>08:54</b><i>정상</i><b>이서윤</b><b>09:08</b><i className="late">지각</i></div>
              <div className="mock-chat"><small>운영팀 채팅</small><p>오늘 현장 일정 확인 부탁드립니다.</p><p className="mine">확인했습니다. 문서도 첨부했어요.</p><div>파일전송.pdf <b>↓</b></div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "connect") {
    return (
      <div className="package-mockup package-mockup-connect" aria-label="현장 인력 운영 웹과 앱 화면 예시">
        <div className="mock-connect-web">
          <div className="mock-browser-bar"><i /><i /><i /><span>WORKCRAFT · 현장운영</span></div>
          <div className="mock-connect-content">
            <div className="mock-connect-head"><small>현장 인력 현황</small><strong>배정 및 근무관리</strong></div>
            <div className="mock-map-card"><span>강남 A현장</span><b>12명 배정</b><i>진행중</i></div>
            <div className="mock-map-card"><span>성수 B현장</span><b>8명 배정</b><i className="ready">준비</i></div>
            <div className="mock-progress"><span>오늘 출근 완료</span><b>87%</b><i><em /></i></div>
          </div>
        </div>
        <div className="mock-phone">
          <div className="mock-phone-speaker" />
          <div className="mock-phone-screen">
            <div className="mock-mobile-head"><b>오늘의 업무</b><span>●</span></div>
            <div className="mock-mobile-site"><small>배정 현장</small><strong>강남 A현장</strong><p>09:00 - 18:00</p></div>
            <button type="button">QR 출근하기</button>
            <div className="mock-mobile-actions"><span>휴무신청</span><span>공지확인</span></div>
            <div className="mock-mobile-notice"><small>새 업무 알림</small><p>현장 담당자가 업무자료를 등록했습니다.</p></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="package-mockup package-mockup-suite" aria-label="재고 발주 문서 통합 웹 앱 PC 화면 예시">
      <div className="mock-suite-pc">
        <div className="mock-pc-title"><span>WORKCRAFT INVENTORY</span><i>— □ ×</i></div>
        <div className="mock-suite-grid">
          <aside><b>ACME LOGISTICS</b><span className="active">통합현황</span><span>입출고</span><span>재고관리</span><span>발주관리</span><span>전자문서</span></aside>
          <div className="mock-suite-main">
            <div className="mock-suite-head"><div><small>실시간 재고현황</small><strong>통합 운영 대시보드</strong></div><button type="button">+ 입고등록</button></div>
            <div className="mock-suite-stats"><div><small>총 품목</small><b>1,248</b></div><div><small>안전재고 미달</small><b>16</b></div><div><small>오늘 출고</small><b>93</b></div></div>
            <div className="mock-inventory-table"><span>품목</span><span>창고</span><span>현재고</span><span>상태</span><b>부품 A-120</b><b>제1창고</b><b>380</b><i>정상</i><b>자재 B-042</b><b>제2창고</b><b>18</b><i className="warning">보충필요</i></div>
          </div>
        </div>
      </div>
      <div className="mock-suite-mobile"><small>바코드 입출고</small><div className="mock-scan-frame"><i /><i /><i /><i /><span>|||| ||| ||||</span></div><b>품목을 스캔해 주세요</b><p>창고별 재고와 LOT 이력이 자동 기록됩니다.</p></div>
      <div className="mock-suite-document"><span>전자결재</span><b>발주서 #PO-26018</b><p>담당자 검토 완료</p><i>승인 대기</i></div>
    </div>
  );
}

function won(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value) + "만원";
}

function durationFor(total: number) {
  if (total < 550) return "약 6~8주";
  if (total < 900) return "약 8~12주";
  if (total < 1400) return "약 12~18주";
  if (total < 2000) return "약 16~24주";
  if (total < 3000) return "약 22~32주";
  return "약 30~40주";
}

function makeQuoteId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BGK-${y}${m}${d}-${suffix}`;
}

function trackWorkcraftEvent(eventName: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const trackedWindow = window as Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };

  // Google Ads conversion labels are not issued yet.
  // These named events mark the exact success points so a future conversion label
  // can be connected without changing the WORKCRAFT user flow.
  if (typeof trackedWindow.gtag === "function") {
    trackedWindow.gtag("event", eventName, params);
    return;
  }

  trackedWindow.dataLayer = trackedWindow.dataLayer || [];
  trackedWindow.dataLayer.push({ event: eventName, ...params });
}

export default function WorkcraftDiagnosis() {
  const [planId, setPlanId] = useState<PlanId>("web");
  const [selected, setSelected] = useState<string[]>([]);
  const [issued, setIssued] = useState<IssuedQuote | null>(null);
  const [notice, setNotice] = useState("");
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [activeDemo, setActiveDemo] = useState<WorkcraftDemoId | null>(null);

  const plan = plans.find((item) => item.id === planId) ?? plans[0];
  const selectedAddons = useMemo(() => addons.filter((item) => selected.includes(item.id)), [selected]);
  const average = plan.price + selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const min = Math.max(plan.price, Math.round((average * 0.85) / 10) * 10);
  const max = Math.round((average * 1.2) / 10) * 10;
  const duration = durationFor(average);

  function toggleAddon(id: string) {
    setSelected((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
    setIssued(null);
  }

  function applyPackageExample(example: PackageExample) {
    setPlanId(example.planId);
    setSelected(example.addonIds);
    setIssued(null);
    setNotice("");
    setSuccess(false);
    window.setTimeout(() => {
      document.getElementById("estimate-live")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  }

  function issueQuote() {
    const quote: IssuedQuote = {
      id: makeQuoteId(),
      issuedAt: new Date().toLocaleString("ko-KR"),
      plan,
      addons: selectedAddons,
      average,
      min,
      max,
      duration,
    };
    setIssued(quote);
    trackWorkcraftEvent("workcraft_quote_generated", {
      quote_id: quote.id,
      package: quote.plan.code,
      estimate_average_manwon: quote.average,
    });
    setNotice("");
    setSuccess(false);
    window.setTimeout(() => document.getElementById("issued-quote")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending || !issued) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const methods = data.getAll("methods").map(String).join(", ");
    const payload = {
      company: String(data.get("company") || "").trim(),
      manager: String(data.get("manager") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      businessAddress: String(data.get("businessAddress") || "").trim(),
      industry: String(data.get("industry") || "").trim(),
      employees: String(data.get("employees") || "").trim(),
      methods,
      pain: String(data.get("pain") || "").trim(),
      desiredStart: String(data.get("desiredStart") || "").trim(),
      preferredDate: String(data.get("preferredDate") || "").trim(),
      decisionMaker: String(data.get("decisionMaker") || "").trim(),
      materials: String(data.get("materials") || "").trim(),
      quoteId: issued.id,
      plan: `${issued.plan.code} · ${issued.plan.title} (${won(issued.plan.price)}~)`,
      addons: issued.addons.length ? issued.addons.map((item) => `${item.title} (+${won(item.price)})`).join(" / ") : "추가 기능 선택 없음",
      estimate: `평균 ${won(issued.average)} / 예상 범위 ${won(issued.min)}~${won(issued.max)} / 기간 ${issued.duration}`,
      website: String(data.get("website") || "").trim(),
    };

    if (!payload.company || !payload.manager || !payload.phone || !payload.businessAddress || !payload.industry || !payload.employees || !payload.pain || !payload.preferredDate || !payload.decisionMaker) {
      setSuccess(false);
      setNotice("필수 항목을 모두 입력해 주세요.");
      return;
    }

    try {
      setSending(true);
      setNotice("");
      setSuccess(false);
      const response = await fetch("/api/business-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result?.message || "현장진단 신청 접수에 실패했습니다.");
      setSuccess(true);
      trackWorkcraftEvent("workcraft_field_diagnosis_submitted", {
        quote_id: issued.id,
        package: issued.plan.code,
        estimate_average_manwon: issued.average,
      });
      setNotice("현장진단 신청이 접수되었습니다. 내용을 검토한 뒤 방문 가능 여부와 일정을 안내드립니다.");
      form.reset();
    } catch (error) {
      setSuccess(false);
      setNotice(error instanceof Error ? error.message : "현장진단 신청 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="diagnosis-workspace">
      <section className="diagnosis-block" aria-labelledby="plan-title">
        <div className="diagnosis-block-head">
          <div>
            <span className="step-label">01 · 기본 구축 패키지</span>
            <h3 id="plan-title">운영환경에 맞는 패키지를 선택하세요.</h3>
          </div>
          <p>플랫폼 기본 구축은 고정하고, 실제 업무에 필요한 기능만 추가해 예상 견적을 산출합니다.</p>
        </div>
        <div className="estimate-plan-grid">
          {plans.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => { setPlanId(item.id); setIssued(null); }}
              className={`estimate-plan ${planId === item.id ? "selected" : ""}`}
              aria-pressed={planId === item.id}
            >
              <span>{item.eyebrow}</span>
              <h4>{item.code}</h4>
              <p className="plan-subtitle">{item.title}</p>
              <b className="plan-platform">{item.platform}</b>
              <strong>{won(item.price)}~</strong>
              <p>{item.description}</p>
              <ul>{item.includes.map((include) => <li key={include}>{include}</li>)}</ul>
              <div className="plan-example"><b>구성 예시</b><small>{item.example}</small></div>
            </button>
          ))}
        </div>
        <p className="package-example-note">DELIVO와 PAWU는 BGK의 자체 운영 제품이며, 위 예시는 플랫폼 연결 구조를 설명하기 위한 참고입니다. 동일한 전체 기능을 복제하는 가격을 의미하지 않습니다.</p>
      </section>

      <section className="diagnosis-block package-examples-block" aria-labelledby="package-examples-title">
        <div className="diagnosis-block-head package-examples-heading">
          <div>
            <span className="step-label">PACKAGE SCREEN EXAMPLES</span>
            <h3 id="package-examples-title">메뉴를 직접 눌러 결과 화면을 확인하세요.</h3>
          </div>
          <p>자주 선택되는 기능을 조합한 클릭형 화면 시뮬레이션입니다. 각 메뉴를 선택하면 실제 구축 시 보게 될 대표 화면과 업무 결과가 바뀝니다.</p>
        </div>

        <div className="package-example-grid">
          {packageExamples.map((example) => {
            const examplePlan = plans.find((item) => item.id === example.planId) ?? plans[0];
            const exampleAddons = addons.filter((item) => example.addonIds.includes(item.id));
            const exampleAverage = examplePlan.price + exampleAddons.reduce((sum, item) => sum + item.price, 0);
            const exampleMin = Math.max(examplePlan.price, Math.round((exampleAverage * 0.85) / 10) * 10);
            const exampleMax = Math.round((exampleAverage * 1.2) / 10) * 10;

            return (
              <article className={`package-example-card package-example-${example.id}`} key={example.id}>
                <div className="package-example-card-head">
                  <div>
                    <span>{example.label}</span>
                    <h4>{example.title}</h4>
                    <p>{example.description}</p>
                  </div>
                  <b>{examplePlan.code}</b>
                </div>

                <PackageMockup variant={example.id} />

                <div className="package-example-details">
                  <div className="package-example-stack">
                    <span className="package-chip base">{examplePlan.code}</span>
                    {exampleAddons.map((item) => <span className="package-chip" key={item.id}>+ {item.title}</span>)}
                  </div>
                  <div className="package-example-price">
                    <small>예상 평균 구축비</small>
                    <strong>{won(exampleAverage)}</strong>
                    <span>{won(exampleMin)}~{won(exampleMax)} · {durationFor(exampleAverage)}</span>
                  </div>
                  <div className="package-example-actions">
                    <button type="button" className="button button-primary full" onClick={() => setActiveDemo(example.id)}>
                      메뉴별 화면 직접 보기
                    </button>
                    <button type="button" className="button button-secondary full" onClick={() => applyPackageExample(example)}>
                      이 구성으로 견적에 담기
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="package-customization-note">
          <div>
            <b>화면은 고정 템플릿이 아닙니다.</b>
            <p>고객사 로고, 서비스명, 대표 색상, 메뉴명, 입력항목, 역할·권한, 업무 흐름과 기본 화면 배치는 현장진단 결과에 맞춰 조정할 수 있습니다.</p>
          </div>
          <div>
            <b>별도 견적이 필요한 경우</b>
            <p>예시와 완전히 다른 전면 UI 설계, 화면 수의 대폭 증가, 복잡한 애니메이션·특수 차트, 새로운 업무 로직은 추가 범위로 산정됩니다.</p>
          </div>
        </div>
      </section>

      <section className="diagnosis-block" aria-labelledby="addon-title">
        <div className="diagnosis-block-head">
          <div>
            <span className="step-label">02 · 추가 기능 선택</span>
            <h3 id="addon-title">필요한 업무 결과를 선택하세요.</h3>
          </div>
          <p>2026년 SW기술자 임금과 국내 공개 외주견적을 참고한 초기 평균값이며, 화면 수·정책·데이터 구조에 따라 달라집니다.</p>
        </div>
        <div className="pricing-benchmark-note">
          <b>가격 산정 기준</b>
          <p>단순 기능 버튼이 아니라 기획·화면·DB·서버 로직·권한·테스트·배포까지 포함한 모듈 단위 예상금액입니다.</p>
        </div>
        <div className="addon-groups">
          {addonCategories.map((group) => (
            <section className="addon-group" key={group.id} aria-labelledby={`addon-${group.id}`}>
              <div className="addon-group-head">
                <h4 id={`addon-${group.id}`}>{group.title}</h4>
                <p>{group.description}</p>
              </div>
              <div className="addon-grid">
                {addons.filter((item) => item.category === group.id).map((item) => {
                  const checked = selected.includes(item.id);
                  return (
                    <label className={`addon-card ${checked ? "selected" : ""}`} key={item.id}>
                      <input type="checkbox" checked={checked} onChange={() => toggleAddon(item.id)} />
                      <span className="addon-check" aria-hidden="true">{checked ? "✓" : "+"}</span>
                      <span className="addon-copy"><b>{item.title}</b><small>{item.description}</small></span>
                      <strong>+{won(item.price)}</strong>
                    </label>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      <aside id="estimate-live" className="estimate-live" aria-live="polite">
        <div>
          <span>실시간 예상 견적</span>
          <h3>{won(average)}</h3>
          <p>예상 범위 {won(min)}~{won(max)} · {duration} · VAT 별도</p>
        </div>
        <div className="estimate-live-actions">
          <button type="button" className="button button-primary" onClick={issueQuote}>예상 견적 발행</button>
          <span>최종 금액은 현장진단 후 확정됩니다.</span>
        </div>
      </aside>

      {issued && (
        <>
          <section id="issued-quote" className="issued-quote quote-print-area">
            <div className="quote-heading">
              <div><span>BGK WORKCRAFT</span><h3>온라인 예상 견적서</h3></div>
              <dl><div><dt>견적번호</dt><dd>{issued.id}</dd></div><div><dt>발행일시</dt><dd>{issued.issuedAt}</dd></div></dl>
            </div>
            <div className="quote-summary-grid">
              <div><span>기본 구축</span><strong>{issued.plan.code}</strong><small>{issued.plan.title} · {won(issued.plan.price)}~</small></div>
              <div><span>선택 기능</span><strong>{issued.addons.length}개</strong><small>{issued.addons.length ? issued.addons.map((item) => item.title).join(", ") : "추가 기능 없음"}</small></div>
              <div><span>평균 예상 구축비</span><strong>{won(issued.average)}</strong><small>VAT 별도</small></div>
              <div><span>예상 개발기간</span><strong>{issued.duration.replace("약 ", "")}</strong><small>현장진단 후 확정</small></div>
            </div>
            <div className="quote-total-row">
              <div><span>예상 견적 범위</span><strong>{won(issued.min)} ~ {won(issued.max)}</strong></div>
              <button type="button" className="button button-secondary print-hidden" onClick={() => window.print()}>인쇄 · PDF 저장</button>
            </div>
            <div className="quote-disclaimer">
              <b>예상 견적 안내</b>
              <p>본 견적은 고객이 선택한 기능과 입력 정보를 기준으로 자동 산출된 예상 금액이며 최종 계약금액이 아닙니다. 실제 업무 흐름, 사용자 수, 데이터 구조, 외부 연동, 보안 요구사항 및 개발 난이도를 현장에서 확인한 뒤 최종 금액과 일정이 확정됩니다.</p>
              <p>최초 확정 범위에 포함되지 않은 신규 기능, 정책 변경, 대규모 데이터 정제·이관 또는 제3자 서비스 정책 변경으로 추가 작업이 필요한 경우 비용과 일정이 조정될 수 있습니다. <strong>추가 비용은 사유와 금액을 사전에 안내하고 고객의 서면 동의를 받은 경우에만 발생합니다.</strong></p>
            </div>
          </section>

          <section id="visit-request" className="visit-request">
            <div className="visit-request-copy">
              <span className="step-label">03 · 현장진단 신청</span>
              <h3>온라인 견적을 확인했다면<br />현장진단을 신청해 주세요.</h3>
              <p>개발 요구사항은 전화·카카오톡·메일로 상담하지 않습니다. 실제 업무자료와 현장 흐름을 직접 확인한 뒤 협의합니다.</p>
              <ul>
                <li>신청은 방문 일정 확정이 아닙니다.</li>
                <li>BGK 내부 검토 후 방문 가능 여부를 안내합니다.</li>
                <li>연락처는 일정 확인과 변경 안내에만 사용합니다.</li>
              </ul>
            </div>
            <form className="diagnosis-form" onSubmit={submit}>
              <div className="form-grid two">
                <label>회사명 *<input name="company" required placeholder="예: ABC시설관리" /></label>
                <label>업종 *<input name="industry" required placeholder="예: 시설관리·청소용역" /></label>
                <label>담당자명 *<input name="manager" required placeholder="예: 홍길동" /></label>
                <label>직원 수 *<select name="employees" required defaultValue=""><option value="" disabled>선택</option><option>1~9명</option><option>10~29명</option><option>30~49명</option><option>50~99명</option><option>100명 이상</option></select></label>
                <label>일정 안내 연락처 *<input name="phone" required inputMode="tel" placeholder="010-0000-0000" /></label>
                <label>이메일<input name="email" type="email" placeholder="선택 입력" /></label>
              </div>
              <label>현장 주소 *<input name="businessAddress" required placeholder="시·군·구와 상세주소를 입력해 주세요." /></label>
              <fieldset>
                <legend>현재 관리 방식</legend>
                <div className="method-options">
                  {["엑셀", "Google Sheets·스프레드시트", "한글·Word·PDF 문서", "카카오톡", "수기 장부", "기존 프로그램", "기타"].map((item) => <label key={item}><input type="checkbox" name="methods" value={item} />{item}</label>)}
                </div>
              </fieldset>
              <label>가장 불편한 업무와 현재 처리 방식 *<textarea name="pain" required rows={5} placeholder="실제 담당자가 어떤 순서로 업무를 처리하고 어디에서 시간이 많이 드는지 적어주세요." /></label>
              <div className="form-grid two">
                <label>구축 희망시기<select name="desiredStart" defaultValue=""><option value="">선택</option><option>1개월 이내</option><option>1~3개월</option><option>3~6개월</option><option>6개월 이후</option><option>협의 필요</option></select></label>
                <label>희망 방문일 *<input name="preferredDate" type="date" required /></label>
                <label>의사결정자 현장 참석 *<select name="decisionMaker" required defaultValue=""><option value="" disabled>선택</option><option>가능합니다</option><option>일정에 따라 가능합니다</option><option>참석이 어렵습니다</option></select></label>
                <label>현재 업무자료 확인 가능 여부<select name="materials" defaultValue=""><option value="">선택</option><option>엑셀·시트·문서·장부·화면 확인 가능</option><option>일부 자료만 확인 가능</option><option>현장에서 협의 필요</option></select></label>
              </div>
              <label className="business-honeypot" aria-hidden="true">웹사이트<input name="website" tabIndex={-1} autoComplete="off" /></label>
              <div className="form-consent">
                <input id="estimate-agreement" type="checkbox" required />
                <label htmlFor="estimate-agreement">온라인 견적은 예상 금액이며, 현장진단 후 최종 견적과 개발범위서가 별도로 확정됨을 확인했습니다.</label>
              </div>
              <button className="button button-primary full" type="submit" disabled={sending}>{sending ? "접수 중..." : "현장진단 신청하기"}</button>
              {notice && <p className={`form-notice ${success ? "success" : ""}`}>{notice}</p>}
            </form>
          </section>
        </>
      )}

      {activeDemo && (
        <WorkcraftPackageDemo
          demoId={activeDemo}
          onClose={() => setActiveDemo(null)}
          onApply={() => {
            const example = packageExamples.find((item) => item.id === activeDemo);
            if (example) applyPackageExample(example);
            setActiveDemo(null);
          }}
        />
      )}
    </div>
  );
}
