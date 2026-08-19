import { NextResponse } from "next/server";
import { Resend } from "resend";
import { workcraftPromotion, workcraftPromotionOpen } from "@/data/workcraftPromotion";

export const runtime = "nodejs";

type InquiryPayload = {
  company?: string;
  manager?: string;
  phone?: string;
  email?: string;
  businessAddress?: string;
  industry?: string;
  employees?: string;
  methods?: string;
  pain?: string;
  desiredStart?: string;
  preferredDate?: string;
  decisionMaker?: string;
  materials?: string;
  quoteId?: string;
  plan?: string;
  addons?: string;
  estimate?: string;
  promotionAcknowledged?: string;
};

function clean(value: unknown, max = 3000) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value: string) {
  return `<tr><td style="width:180px;padding:10px 14px;font-weight:700;background:#f3f6fa;border-bottom:1px solid #e5e7eb">${escapeHtml(label)}</td><td style="padding:10px 14px;white-space:pre-wrap;border-bottom:1px solid #e5e7eb">${escapeHtml(value || "미입력")}</td></tr>`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryPayload;

    const company = clean(body.company, 120);
    const manager = clean(body.manager, 80);
    const phone = clean(body.phone, 80);
    const email = clean(body.email, 160);
    const businessAddress = clean(body.businessAddress, 300);
    const industry = clean(body.industry, 160);
    const employees = clean(body.employees, 80);
    const methods = clean(body.methods, 500);
    const pain = clean(body.pain, 3500);
    const desiredStart = clean(body.desiredStart, 100);
    const preferredDate = clean(body.preferredDate, 80);
    const decisionMaker = clean(body.decisionMaker, 120);
    const materials = clean(body.materials, 160);
    const quoteId = clean(body.quoteId, 80);
    const plan = clean(body.plan, 240);
    const addons = clean(body.addons, 2500);
    const estimate = clean(body.estimate, 500);
    const promotionAcknowledged = clean(body.promotionAcknowledged, 40);
    if (!company || !manager || !phone || !businessAddress || !industry || !employees || !pain || !preferredDate || !decisionMaker || !quoteId || !plan || !estimate || (workcraftPromotionOpen && !promotionAcknowledged)) {
      return NextResponse.json({ message: "필수 항목을 모두 입력해 주세요." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.BGK_INQUIRY_TO || "bgkcogito@naver.com";
    const from = process.env.BGK_RESEND_FROM;

    if (!apiKey || !from) {
      console.error("BGK inquiry mail is not configured: missing RESEND_API_KEY/BGK_RESEND_FROM");
      return NextResponse.json(
        { message: "현재 온라인 진단 접수 설정을 확인 중입니다. 잠시 후 다시 시도해 주세요." },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const safeReplyTo = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;
    const subject = `[BGK WORKCRAFT 현장진단] ${company} / ${quoteId}`;
    const receivedAt = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

    const text = [
      "BGK WORKCRAFT 현장진단 신청이 접수되었습니다.",
      "",
      `견적번호: ${quoteId}`,
      `회사명: ${company}`,
      `업종: ${industry}`,
      `직원 수: ${employees}`,
      `현장 주소: ${businessAddress}`,
      `담당자명: ${manager}`,
      `일정 안내 연락처: ${phone}`,
      `이메일: ${email || "미입력"}`,
      `현재 관리 방식: ${methods || "미입력"}`,
      `가장 불편한 업무: ${pain}`,
      `기본 구축: ${plan}`,
      `추가 기능: ${addons || "없음"}`,
      `온라인 예상견적: ${estimate}`,
      `출시 프로모션: ${workcraftPromotionOpen ? `${workcraftPromotion.benefit} / 조건 확인 ${promotionAcknowledged || "미확인"}` : "마감"}`,
      `구축 희망시기: ${desiredStart || "미입력"}`,
      `희망 방문일: ${preferredDate}`,
      `의사결정자 참석: ${decisionMaker}`,
      `업무자료 확인: ${materials || "미입력"}`,
      "",
      `접수 시각: ${receivedAt}`,
    ].join("\n");

    const html = `
      <div style="font-family:Arial,'Noto Sans KR',sans-serif;line-height:1.65;color:#111827;max-width:820px;margin:auto">
        <div style="padding:24px 28px;background:#0b1f3a;color:#fff;border-radius:16px 16px 0 0">
          <p style="margin:0 0 6px;font-size:12px;letter-spacing:1.5px;color:#91b8ff">BGK WORKCRAFT</p>
          <h2 style="margin:0;font-size:24px">기업 현장진단 신청</h2>
        </div>
        <table style="border-collapse:collapse;width:100%;border:1px solid #e5e7eb">
          <tbody>
            ${row("견적번호", quoteId)}
            ${row("회사명", company)}
            ${row("업종", industry)}
            ${row("직원 수", employees)}
            ${row("현장 주소", businessAddress)}
            ${row("담당자명", manager)}
            ${row("일정 안내 연락처", phone)}
            ${row("이메일", email || "미입력")}
            ${row("현재 관리 방식", methods || "미입력")}
            ${row("가장 불편한 업무", pain)}
            ${row("기본 구축", plan)}
            ${row("추가 기능", addons || "없음")}
            ${row("온라인 예상견적", estimate)}
            ${row("출시 프로모션", workcraftPromotionOpen ? `${workcraftPromotion.benefit} / 조건 확인 ${promotionAcknowledged || "미확인"}` : "마감")}
            ${row("구축 희망시기", desiredStart || "미입력")}
            ${row("희망 방문일", preferredDate)}
            ${row("의사결정자 참석", decisionMaker)}
            ${row("업무자료 확인", materials || "미입력")}
            ${row("접수 시각", receivedAt)}
          </tbody>
        </table>
        <p style="margin:18px 0 0;color:#6b7280;font-size:13px">이 신청은 방문 일정 확정이 아닙니다. 프로젝트 적합성과 일정을 검토한 뒤 방문 가능 여부를 안내하세요.</p>
      </div>
    `;

    const result = await resend.emails.send({
      from,
      to: recipient,
      replyTo: safeReplyTo,
      subject,
      text,
      html,
    });

    if (result.error) {
      console.error("Resend inquiry error", result.error);
      return NextResponse.json({ message: "현장진단 접수 메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("BGK workcraft inquiry error", error);
    return NextResponse.json({ message: "현장진단 신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }
}
