"use client";

import { FormEvent, useMemo, useState } from "react";

type PlanId = "web" | "web-app" | "full";

type Plan = {
  id: PlanId;
  eyebrow: string;
  title: string;
  price: number;
  description: string;
  includes: string[];
};

type Addon = {
  id: string;
  title: string;
  description: string;
  price: number;
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
    eyebrow: "STEP 01",
    title: "WEB 업무 시스템",
    price: 390,
    description: "사내 관리자 페이지와 업무용 웹 시스템을 구축합니다.",
    includes: ["반응형 웹", "로그인·기본 권한", "관리자 화면", "데이터베이스", "운영 배포"],
  },
  {
    id: "web-app",
    eyebrow: "STEP 02",
    title: "WEB + APP",
    price: 690,
    description: "관리자 웹과 직원·고객용 모바일 앱 1종을 연동합니다.",
    includes: ["WEB 기본 구성", "모바일 앱 1종", "푸시알림", "파일 업로드", "앱 빌드"],
  },
  {
    id: "full",
    eyebrow: "STEP 03",
    title: "WEB + APP + PC",
    price: 990,
    description: "웹·모바일 앱·Windows 프로그램을 하나의 데이터로 연결합니다.",
    includes: ["WEB + APP 구성", "Windows 프로그램", "통합 권한", "통합 데이터", "배포 환경 구성"],
  },
];

const addons: Addon[] = [
  { id: "organization", title: "직원·조직·세부 권한", description: "부서·팀·직책별 접근 권한과 관리자 범위 설정", price: 80 },
  { id: "attendance", title: "QR 출퇴근", description: "QR 스캔 기반 출퇴근, 근무시간과 지각 기록", price: 120 },
  { id: "leave", title: "연차·휴무 신청 승인", description: "연차 생성, 신청, 승인·반려와 잔여일 관리", price: 100 },
  { id: "assignment", title: "현장·업무·직원 배정", description: "현장별 담당자, 일정, 상태와 완료 여부 관리", price: 130 },
  { id: "settlement", title: "급여·수당·정산", description: "기본급·인센티브·수당·공제 계산과 월 정산", price: 180 },
  { id: "statement", title: "명세서·정산서 PDF", description: "급여명세서 또는 정산서를 PDF로 자동 생성", price: 100 },
  { id: "notice", title: "공지·업무지시·확인", description: "공지 등록, 대상 지정, 확인 여부와 업무 체크", price: 80 },
  { id: "chat", title: "사내 채팅·파일 전송", description: "업무 채팅방, 사진·문서 첨부와 참여자 권한", price: 150 },
  { id: "push", title: "푸시알림·화면 바로가기", description: "주요 이벤트 알림과 해당 업무 화면 이동", price: 80 },
  { id: "dashboard", title: "운영통계·대시보드", description: "기간별 현황, 비교 지표와 엑셀 다운로드", price: 120 },
  { id: "calendar", title: "예약·일정·캘린더", description: "예약 가능시간, 일정 배정과 진행상태 관리", price: 120 },
  { id: "billing", title: "결제·구독관리 연동", description: "결제수단 등록, 구독 상태와 갱신 관리", price: 180 },
  { id: "social", title: "소셜 로그인 1종", description: "Google·Kakao·Naver 중 1개 로그인 연동", price: 60 },
  { id: "api", title: "외부 API 연동 1종", description: "외부 서비스 또는 공공데이터 API 연결", price: 100 },
  { id: "migration", title: "기존 데이터 이전", description: "엑셀·고객·직원 데이터를 정리해 시스템으로 이전", price: 150 },
  { id: "ai", title: "AI 요약·분류·문서 초안", description: "업무내용 요약, 자동 분류 또는 문서 초안 생성", price: 200 },
  { id: "additional-os", title: "추가 앱 운영체제", description: "기본 앱 1종 외 Android 또는 iOS 추가 구축", price: 200 },
  { id: "multi-company", title: "여러 회사·지점 분리관리", description: "법인·지점별 데이터, 권한과 통계 분리", price: 200 },
  { id: "audit", title: "고급 로그·보안·승인이력", description: "주요 작업 기록, 승인 이력과 보안 정책 강화", price: 150 },
];

function won(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value) + "만원";
}

function durationFor(total: number) {
  if (total < 550) return "약 6~8주";
  if (total < 850) return "약 8~12주";
  if (total < 1250) return "약 12~16주";
  if (total < 1800) return "약 16~22주";
  return "약 22~30주";
}

function makeQuoteId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BGK-${y}${m}${d}-${suffix}`;
}

export default function WorkcraftDiagnosis() {
  const [planId, setPlanId] = useState<PlanId>("web");
  const [selected, setSelected] = useState<string[]>([]);
  const [issued, setIssued] = useState<IssuedQuote | null>(null);
  const [notice, setNotice] = useState("");
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const plan = plans.find((item) => item.id === planId) ?? plans[0];
  const selectedAddons = useMemo(() => addons.filter((item) => selected.includes(item.id)), [selected]);
  const average = plan.price + selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const min = Math.max(plan.price, Math.round((average * 0.9) / 10) * 10);
  const max = Math.round((average * 1.15) / 10) * 10;
  const duration = durationFor(average);

  function toggleAddon(id: string) {
    setSelected((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
    setIssued(null);
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
      plan: `${issued.plan.title} (${won(issued.plan.price)}~)`,
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
            <span className="step-label">01 · 기본 구축 선택</span>
            <h3 id="plan-title">구축 단계 하나를 선택하세요.</h3>
          </div>
          <p>기본 단계에 포함된 기능은 자동으로 적용되며, 필요한 기능만 추가하면 됩니다.</p>
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
              <h4>{item.title}</h4>
              <strong>{won(item.price)}~</strong>
              <p>{item.description}</p>
              <ul>{item.includes.map((include) => <li key={include}>{include}</li>)}</ul>
            </button>
          ))}
        </div>
      </section>

      <section className="diagnosis-block" aria-labelledby="addon-title">
        <div className="diagnosis-block-head">
          <div>
            <span className="step-label">02 · 추가 기능 선택</span>
            <h3 id="addon-title">필요한 결과를 선택하세요.</h3>
          </div>
          <p>아래 금액은 평균 개발 난이도를 기준으로 한 초기 예상값입니다.</p>
        </div>
        <div className="addon-grid">
          {addons.map((item) => {
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

      <aside className="estimate-live" aria-live="polite">
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
              <div><span>기본 구축</span><strong>{issued.plan.title}</strong><small>{won(issued.plan.price)}~</small></div>
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
                  {["엑셀", "카카오톡", "수기 장부", "기존 프로그램", "기타"].map((item) => <label key={item}><input type="checkbox" name="methods" value={item} />{item}</label>)}
                </div>
              </fieldset>
              <label>가장 불편한 업무와 현재 처리 방식 *<textarea name="pain" required rows={5} placeholder="실제 담당자가 어떤 순서로 업무를 처리하고 어디에서 시간이 많이 드는지 적어주세요." /></label>
              <div className="form-grid two">
                <label>구축 희망시기<select name="desiredStart" defaultValue=""><option value="">선택</option><option>1개월 이내</option><option>1~3개월</option><option>3~6개월</option><option>6개월 이후</option><option>협의 필요</option></select></label>
                <label>희망 방문일 *<input name="preferredDate" type="date" required /></label>
                <label>의사결정자 현장 참석 *<select name="decisionMaker" required defaultValue=""><option value="" disabled>선택</option><option>가능합니다</option><option>일정에 따라 가능합니다</option><option>참석이 어렵습니다</option></select></label>
                <label>현재 업무자료 확인 가능 여부<select name="materials" defaultValue=""><option value="">선택</option><option>엑셀·장부·화면 확인 가능</option><option>일부 자료만 확인 가능</option><option>현장에서 협의 필요</option></select></label>
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
    </div>
  );
}
