"use client";

import { FormEvent, useState } from "react";

export default function BusinessInquiryForm() {
  const [notice, setNotice] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      company: String(data.get("company") || "").trim(),
      manager: String(data.get("manager") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      method: String(data.get("method") || "").trim(),
      features: String(data.get("features") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (!payload.company || !payload.manager || !payload.phone || !payload.features) {
      setSuccess(false);
      setNotice("회사명, 담당자명, 연락처, 필요한 기능을 입력해 주세요.");
      return;
    }

    try {
      setSending(true);
      setSuccess(false);
      setNotice("");

      const response = await fetch("/api/business-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result?.message || "문의 접수에 실패했습니다.");
      }

      setSuccess(true);
      setNotice("상담 문의가 접수되었습니다. 확인 후 연락드리겠습니다.");
      form.reset();
    } catch (error) {
      setSuccess(false);
      setNotice(error instanceof Error ? error.message : "문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="business-form" onSubmit={submit}>
      <div className="form-grid">
        <label>회사명 *<input name="company" required placeholder="예: ABC물류" /></label>
        <label>담당자명 *<input name="manager" required placeholder="예: 홍길동" /></label>
        <label>연락처 *<input name="phone" required inputMode="tel" placeholder="예: 010-1234-5678" /></label>
        <label>이메일<input name="email" type="email" placeholder="예: contact@company.co.kr" /></label>
      </div>
      <label>현재 관리 방식<input name="method" placeholder="예: 엑셀, 카카오톡, 수기 장부를 함께 사용 중" /></label>
      <label>필요한 기능 *<textarea name="features" required rows={3} placeholder="예: QR 출퇴근, 연차 승인, 급여 정산, 급여명세서, 사내 공지" /></label>
      <label>문의 내용<textarea name="message" rows={4} placeholder="직원 수, 현재 불편한 점, 원하는 개발 일정 등을 자유롭게 적어주세요." /></label>
      <div className="form-submit-row">
        <button className="btn primary" type="submit" disabled={sending}>{sending ? "접수 중..." : "상담 문의하기"}</button>
        <span>접수 전 비용이 발생하지 않습니다.</span>
      </div>
      {notice && <p className={`form-notice${success ? " success" : ""}`}>{notice}</p>}
    </form>
  );
}
