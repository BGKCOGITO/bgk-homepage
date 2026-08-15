import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type InquiryPayload = {
  company?: string;
  manager?: string;
  phone?: string;
  email?: string;
  method?: string;
  features?: string;
  message?: string;
  website?: string;
};

function clean(value: unknown, max = 2000) {
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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryPayload;

    const company = clean(body.company, 120);
    const manager = clean(body.manager, 80);
    const phone = clean(body.phone, 80);
    const email = clean(body.email, 160);
    const method = clean(body.method, 1000);
    const features = clean(body.features, 2000);
    const message = clean(body.message, 3000);
    const website = clean(body.website, 200);

    // Bot trap: normal users never see or fill this field.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!company || !manager || !phone || !features) {
      return NextResponse.json(
        { message: "필수 항목을 모두 입력해 주세요." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.BGK_INQUIRY_TO || "bgkcogito@naver.com";
    const from = process.env.BGK_RESEND_FROM;

    if (!apiKey || !from) {
      console.error("BGK inquiry mail is not configured: missing RESEND_API_KEY/BGK_RESEND_FROM");
      return NextResponse.json(
        { message: "현재 온라인 문의 메일 설정을 확인 중입니다. 잠시 후 다시 시도해 주세요." },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const safeReplyTo = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;
    const subject = `[BGK 기업 SaaS 문의] ${company} / ${manager}`;
    const receivedAt = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

    const text = [
      "BGK 기업 맞춤형 SaaS 상담 문의가 접수되었습니다.",
      "",
      `회사명: ${company}`,
      `담당자명: ${manager}`,
      `연락처: ${phone}`,
      `이메일: ${email || "미입력"}`,
      `현재 관리 방식: ${method || "미입력"}`,
      `필요한 기능: ${features}`,
      `문의 내용: ${message || "미입력"}`,
      "",
      `접수 시각: ${receivedAt}`,
    ].join("\n");

    const html = `
      <div style="font-family:Arial,'Noto Sans KR',sans-serif;line-height:1.65;color:#111827">
        <h2 style="margin:0 0 20px">BGK 기업 맞춤형 SaaS 상담 문의</h2>
        <table style="border-collapse:collapse;width:100%;max-width:720px">
          <tbody>
            <tr><td style="padding:8px 12px;font-weight:700;background:#f3f4f6">회사명</td><td style="padding:8px 12px">${escapeHtml(company)}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:700;background:#f3f4f6">담당자명</td><td style="padding:8px 12px">${escapeHtml(manager)}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:700;background:#f3f4f6">연락처</td><td style="padding:8px 12px">${escapeHtml(phone)}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:700;background:#f3f4f6">이메일</td><td style="padding:8px 12px">${escapeHtml(email || "미입력")}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:700;background:#f3f4f6">현재 관리 방식</td><td style="padding:8px 12px;white-space:pre-wrap">${escapeHtml(method || "미입력")}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:700;background:#f3f4f6">필요한 기능</td><td style="padding:8px 12px;white-space:pre-wrap">${escapeHtml(features)}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:700;background:#f3f4f6">문의 내용</td><td style="padding:8px 12px;white-space:pre-wrap">${escapeHtml(message || "미입력")}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:700;background:#f3f4f6">접수 시각</td><td style="padding:8px 12px">${escapeHtml(receivedAt)}</td></tr>
          </tbody>
        </table>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to: [recipient],
      replyTo: safeReplyTo,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("BGK Resend API error:", error);
      return NextResponse.json(
        { message: "문의 접수 중 메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("BGK business inquiry error", error);
    return NextResponse.json(
      { message: "문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
