"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type WorkcraftDemoId = "core" | "connect" | "suite";
type DemoPlatformId = "web" | "app" | "pc";

type DemoScreen = {
  id: string;
  label: string;
  title: string;
  description: string;
  kind: string;
  outcome: string;
};

type DemoPlatform = {
  id: DemoPlatformId;
  label: string;
  caption: string;
  screens: DemoScreen[];
};

type DemoPackage = {
  id: WorkcraftDemoId;
  code: string;
  title: string;
  subtitle: string;
  brand: string;
  platforms: DemoPlatform[];
};

type Props = {
  demoId: WorkcraftDemoId;
  onClose: () => void;
  onApply: () => void;
};

const DEMOS: Record<WorkcraftDemoId, DemoPackage> = {
  core: {
    id: "core",
    code: "WORKCRAFT CORE",
    title: "사내 근태·소통 관리 Web",
    subtitle: "QR 출퇴근과 사내 채팅·파일 전송을 결합한 웹 업무시스템 예시",
    brand: "NOVA WORKS",
    platforms: [
      {
        id: "web",
        label: "관리 Web",
        caption: "PC와 모바일 브라우저에서 사용하는 사내 운영화면",
        screens: [
          { id: "dashboard", label: "대시보드", title: "오늘의 운영 대시보드", description: "출근·지각·미출근과 최근 업무를 한 화면에서 확인합니다.", kind: "core-dashboard", outcome: "대표와 관리자가 오늘의 인력 현황을 첫 화면에서 바로 파악합니다." },
          { id: "employees", label: "직원관리", title: "직원·계정 관리", description: "직원, 부서, 직책과 계정상태를 관리합니다.", kind: "people", outcome: "입사·부서이동·퇴사 처리를 파일 없이 하나의 목록에서 관리합니다." },
          { id: "attendance", label: "QR 출퇴근", title: "QR 출퇴근 기록", description: "회사 QR을 스캔한 시간과 근무상태를 기록합니다.", kind: "attendance", outcome: "직원별 출퇴근·지각·조퇴 기록이 자동으로 누적됩니다." },
          { id: "analytics", label: "근무시간 통계", title: "월 근무시간 통계", description: "직원별·부서별 근무시간을 비교하고 내려받습니다.", kind: "work-analytics", outcome: "월말 근무자료를 자동 집계하고 표준 엑셀로 내려받습니다." },
          { id: "chat", label: "사내 채팅", title: "업무 채팅·파일 전송", description: "팀별 채팅방에서 업무 메시지와 문서를 주고받습니다.", kind: "chat", outcome: "개인 메신저와 업무 파일을 분리하고 회사 안에 기록을 남깁니다." },
          { id: "files", label: "파일함", title: "업무 파일 보관함", description: "채팅과 업무에서 전송된 문서를 분류·검색합니다.", kind: "files", outcome: "계약서·매뉴얼·업무자료를 담당자 변경 후에도 찾을 수 있습니다." },
          { id: "settings", label: "권한·설정", title: "회사 설정·로그인", description: "로고, 색상, 메뉴 권한과 소셜 로그인을 설정합니다.", kind: "settings", outcome: "고객사 브랜드와 역할에 맞는 내부 시스템으로 운영합니다." },
        ],
      },
    ],
  },
  connect: {
    id: "connect",
    code: "WORKCRAFT CONNECT",
    title: "현장 인력 운영 Web + App",
    subtitle: "관리자 Web과 직원 Android App을 연결한 현장 운영시스템 예시",
    brand: "FIELD ONE",
    platforms: [
      {
        id: "web",
        label: "관리자 Web",
        caption: "대표·관리자가 현장과 직원을 관리하는 화면",
        screens: [
          { id: "dashboard", label: "운영 대시보드", title: "현장 운영 대시보드", description: "현장 수, 출근율, 미배정 인원과 휴무 요청을 확인합니다.", kind: "field-dashboard", outcome: "여러 현장의 오늘 상태와 조치할 업무를 한 화면에서 확인합니다." },
          { id: "organization", label: "직원·조직", title: "직원·조직·권한", description: "부서·팀·직책별 인원과 관리자 권한을 설정합니다.", kind: "organization", outcome: "본사·팀·현장별로 볼 수 있는 정보와 관리 범위를 구분합니다." },
          { id: "sites", label: "현장관리", title: "현장 등록·운영", description: "현장 주소, 일정, 필요인원과 담당자를 관리합니다.", kind: "sites", outcome: "현장별 인원·일정·특이사항을 별도 시트 없이 관리합니다." },
          { id: "assignments", label: "직원배정", title: "현장·업무 직원배정", description: "직원을 일정과 현장에 배정하고 중복을 확인합니다.", kind: "assignments", outcome: "누가 어느 현장에 배정됐는지 실시간으로 공유됩니다." },
          { id: "attendance", label: "출퇴근 현황", title: "현장별 출퇴근 현황", description: "QR 출퇴근 결과를 현장·부서·날짜별로 조회합니다.", kind: "attendance-overview", outcome: "본사에서 각 현장의 출근 완료율과 이상 기록을 확인합니다." },
          { id: "leave", label: "휴무 승인", title: "연차·휴무 승인", description: "신청, 승인·반려, 잔여일과 대체인력을 관리합니다.", kind: "leave-approval", outcome: "휴무 요청과 현장 인력 공백을 동시에 확인하고 승인합니다." },
          { id: "notices", label: "공지·알림", title: "공지·푸시알림", description: "대상자를 지정해 공지하고 확인 여부를 추적합니다.", kind: "notices", outcome: "직원 App으로 알림을 보내고 읽음 여부까지 확인합니다." },
        ],
      },
      {
        id: "app",
        label: "직원 App",
        caption: "현장 직원이 출퇴근·업무·휴무를 처리하는 Android App",
        screens: [
          { id: "home", label: "홈", title: "직원 App 홈", description: "오늘의 현장, 출근상태와 새 공지를 보여줍니다.", kind: "mobile-home", outcome: "직원은 앱을 열자마자 오늘 해야 할 업무를 확인합니다." },
          { id: "qr", label: "QR 출퇴근", title: "QR 출퇴근", description: "현장 또는 회사에 비치된 QR을 스캔합니다.", kind: "mobile-qr", outcome: "첫 스캔은 출근, 퇴근 시 다시 스캔해 퇴근시간을 기록합니다." },
          { id: "tasks", label: "오늘의 업무", title: "배정 업무 확인", description: "오늘 배정된 현장, 시간과 업무자료를 확인합니다.", kind: "mobile-task", outcome: "담당자가 변경해도 최신 배정내용이 앱에 즉시 반영됩니다." },
          { id: "leave", label: "휴무 신청", title: "연차·휴무 신청", description: "휴무 종류와 날짜, 사유를 선택해 신청합니다.", kind: "mobile-leave", outcome: "신청결과와 잔여 연차를 직원이 직접 확인합니다." },
          { id: "notice", label: "공지", title: "회사 공지 확인", description: "필수 공지와 첨부파일을 확인합니다.", kind: "mobile-notice", outcome: "회사는 미확인자를 파악하고 직원은 공지 이력을 보관합니다." },
          { id: "alerts", label: "알림", title: "업무 알림센터", description: "배정, 승인, 공지와 변경 알림을 모아봅니다.", kind: "mobile-alerts", outcome: "푸시알림을 놓쳐도 앱 안에서 모든 변경 이력을 확인합니다." },
          { id: "profile", label: "내정보", title: "내 정보·근무현황", description: "계정정보, 소속, 연차와 월 근무시간을 확인합니다.", kind: "mobile-profile", outcome: "직원이 본인의 회사정보와 근무현황을 직접 확인합니다." },
        ],
      },
    ],
  },
  suite: {
    id: "suite",
    code: "WORKCRAFT SUITE",
    title: "재고·발주·문서 통합 운영",
    subtitle: "관리 Web·현장 App·Windows 업무 클라이언트를 하나의 데이터로 연결한 예시",
    brand: "STOCK FLOW",
    platforms: [
      {
        id: "web",
        label: "관리자 Web",
        caption: "대표·관리자가 재고와 발주·결재를 통합 관리하는 화면",
        screens: [
          { id: "dashboard", label: "통합 대시보드", title: "재고·발주 통합 대시보드", description: "총 재고, 미달 품목, 입출고와 승인대기를 확인합니다.", kind: "inventory-dashboard", outcome: "재고·발주·문서 상태를 하나의 경영 화면으로 통합합니다." },
          { id: "products", label: "품목관리", title: "품목·단가·안전재고", description: "품목코드, 단가, 안전재고와 거래처를 관리합니다.", kind: "products", outcome: "품목명 중복과 단가 오류를 줄이고 기준정보를 통일합니다." },
          { id: "warehouses", label: "창고별 재고", title: "창고별 현재고", description: "다중창고 재고와 이동 이력을 조회합니다.", kind: "warehouses", outcome: "어느 창고에 무엇이 얼마나 있는지 실시간으로 확인합니다." },
          { id: "orders", label: "발주·주문", title: "견적·발주·주문관리", description: "요청부터 승인·발주·입고까지 진행상태를 관리합니다.", kind: "orders", outcome: "메일과 문서로 나뉜 발주 흐름을 하나의 상태값으로 관리합니다." },
          { id: "approvals", label: "전자결재", title: "문서·발주 전자결재", description: "결재선, 승인·반려, 의견과 변경이력을 관리합니다.", kind: "approvals", outcome: "누가 언제 승인했는지 기록하고 누락된 결재를 줄입니다." },
          { id: "stats", label: "운영통계", title: "재고·발주 운영통계", description: "회전율, 미달률, 거래처별 발주를 분석합니다.", kind: "inventory-stats", outcome: "월별 의사결정에 필요한 표와 지표를 자동 생성합니다." },
        ],
      },
      {
        id: "app",
        label: "현장 App",
        caption: "현장에서 바코드로 입출고와 재고를 처리하는 Android App",
        screens: [
          { id: "scan", label: "바코드 스캔", title: "바코드·QR 스캔", description: "품목 또는 LOT 바코드를 스캔합니다.", kind: "mobile-scan", outcome: "현장에서 품목을 검색하지 않고 즉시 입출고를 시작합니다." },
          { id: "stock-in", label: "입고등록", title: "입고 등록", description: "수량, 창고, LOT와 검수사진을 입력합니다.", kind: "mobile-stock-in", outcome: "입고 즉시 재고와 이력이 서버에 반영됩니다." },
          { id: "stock-out", label: "출고등록", title: "출고 등록", description: "출고처, 수량과 담당자를 확인해 처리합니다.", kind: "mobile-stock-out", outcome: "잘못된 품목·수량 출고를 확인단계에서 줄입니다." },
          { id: "lookup", label: "재고조회", title: "실시간 재고 조회", description: "품목명·코드로 창고별 재고를 검색합니다.", kind: "mobile-stock-lookup", outcome: "현장 직원도 최신 현재고와 안전재고 상태를 확인합니다." },
          { id: "lot", label: "LOT 조회", title: "LOT·시리얼 이력", description: "입고일, 이동, 출고와 담당자 이력을 확인합니다.", kind: "mobile-lot", outcome: "문제가 발생한 제품의 이동경로를 빠르게 추적합니다." },
          { id: "alerts", label: "작업 알림", title: "재고·작업 알림", description: "안전재고, 승인완료와 작업요청을 확인합니다.", kind: "mobile-stock-alerts", outcome: "보충과 출고 요청을 놓치지 않고 현장에 바로 전달합니다." },
        ],
      },
      {
        id: "pc",
        label: "Windows 업무 클라이언트",
        caption: "사무실에서 대량입력·문서·라벨을 처리하는 Windows 업무 클라이언트",
        screens: [
          { id: "transactions", label: "입출고 처리", title: "대량 입출고 처리", description: "여러 품목의 수량과 창고를 빠르게 입력합니다.", kind: "pc-transactions", outcome: "키보드 중심의 빠른 입력으로 반복 사무작업을 줄입니다." },
          { id: "purchase", label: "발주서", title: "발주서 작성·발행", description: "거래처, 품목, 단가를 불러와 발주서를 만듭니다.", kind: "pc-purchase", outcome: "표준 양식의 발주서를 즉시 PDF·인쇄로 발행합니다." },
          { id: "statement", label: "거래명세서", title: "거래명세서 발행", description: "출고 내역으로 거래명세서를 자동 작성합니다.", kind: "pc-statement", outcome: "동일 내용을 엑셀과 문서에 반복 입력하지 않습니다." },
          { id: "labels", label: "라벨 출력", title: "바코드·품목 라벨 출력", description: "선택 품목을 라벨 규격에 맞춰 출력합니다.", kind: "pc-labels", outcome: "창고 라벨과 바코드를 정해진 규격으로 바로 출력합니다." },
          { id: "import", label: "대량 엑셀", title: "엑셀 대량 등록", description: "표준 양식으로 품목·재고·거래처를 일괄 등록합니다.", kind: "pc-import", outcome: "기존 자료를 검증한 뒤 시스템으로 빠르게 이전합니다." },
          { id: "approval", label: "결재 현황", title: "결재·문서 현황", description: "승인대기 문서와 의견·이력을 확인합니다.", kind: "pc-approvals", outcome: "발주·정산 문서의 승인 상태를 사무실 업무 클라이언트에서 관리합니다." },
        ],
      },
    ],
  },
};

function StatCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return <article className="demo-stat-card"><span>{label}</span><strong>{value}</strong>{note && <small>{note}</small>}</article>;
}

function DemoBarChart({ labels = ["월", "화", "수", "목", "금", "토"], values = [48, 67, 58, 84, 72, 39] }: { labels?: string[]; values?: number[] }) {
  return (
    <div className="demo-bar-chart" aria-label="업무 데이터 차트 예시">
      {values.map((value, index) => <div key={`${labels[index]}-${value}`}><i style={{ height: `${value}%` }} /><span>{labels[index]}</span></div>)}
    </div>
  );
}

function Status({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "blue" | "amber" | "red" | "gray" }) {
  return <span className={`demo-status ${tone}`}>{children}</span>;
}

function DemoTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="demo-data-table" role="table">
      <div className="demo-data-row demo-data-head" role="row">{headers.map((header) => <span key={header} role="columnheader">{header}</span>)}</div>
      {rows.map((row, rowIndex) => <div className="demo-data-row" role="row" key={rowIndex}>{row.map((cell, cellIndex) => <span role="cell" key={cellIndex}>{cell}</span>)}</div>)}
    </div>
  );
}

function DemoScreenContent({ kind }: { kind: string }) {
  switch (kind) {
    case "core-dashboard":
      return <><div className="demo-stat-grid four"><StatCard label="출근 완료" value="28명" note="전체 31명" /><StatCard label="지각" value="2명" note="어제 대비 -1" /><StatCard label="미출근" value="1명" note="확인 필요" /><StatCard label="읽지 않은 공지" value="3건" note="운영팀" /></div><div className="demo-content-grid two"><section className="demo-panel"><header><div><span>주간 출근율</span><strong>92.8%</strong></div><Status tone="blue">정상 운영</Status></header><DemoBarChart /></section><section className="demo-panel"><header><div><span>최근 업무</span><strong>확인할 항목</strong></div></header><ul className="demo-activity-list"><li><i className="blue" /><div><b>김현우</b><p>안전교육 자료 확인 완료</p></div><time>09:14</time></li><li><i className="amber" /><div><b>이서윤</b><p>출근시간 09:08 · 지각</p></div><time>09:08</time></li><li><i className="green" /><div><b>운영팀</b><p>현장 일정표 파일 등록</p></div><time>08:42</time></li></ul></section></div></>;
    case "people":
      return <><div className="demo-toolbar-row"><div className="demo-search">직원명·사번 검색</div><button>+ 직원 등록</button></div><DemoTable headers={["직원", "부서·직책", "로그인 ID", "근무상태", "계정"]} rows={[[<b key="a">김현우</b>,"운영팀 · 팀장","E-1004",<Status key="b">근무중</Status>,<Status key="c" tone="blue">정상</Status>],[<b key="d">이서윤</b>,"현장팀 · 매니저","E-1012",<Status key="e" tone="amber">휴무예정</Status>,<Status key="f" tone="blue">정상</Status>],[<b key="g">박민준</b>,"지원팀 · 사원","E-1028",<Status key="h" tone="gray">퇴사</Status>,<Status key="i" tone="gray">비활성</Status>]]} /></>;
    case "attendance":
      return <div className="demo-content-grid attendance"><section className="demo-qr-panel"><span>회사 출퇴근 QR</span><div className="demo-qr-code">▦</div><b>NOVA-HQ-01</b><small>현재 위치 · 본사 1층</small></section><section className="demo-panel"><header><div><span>오늘 출퇴근 기록</span><strong>2026.08.18</strong></div><button>엑셀 저장</button></header><DemoTable headers={["직원", "출근", "퇴근", "근무시간", "상태"]} rows={[["김현우","08:54","-","진행중",<Status key="a">정상</Status>],["이서윤","09:08","-","진행중",<Status key="b" tone="amber">지각</Status>],["최민아","08:47","18:02","8시간 15분",<Status key="c" tone="blue">완료</Status>]]} /></section></div>;
    case "work-analytics":
      return <><div className="demo-stat-grid three"><StatCard label="평균 근무시간" value="8h 07m" note="전월 +12분" /><StatCard label="총 연장근무" value="42h" note="전월 -8%" /><StatCard label="지각률" value="2.1%" note="목표 3% 이하" /></div><div className="demo-content-grid two"><section className="demo-panel"><header><div><span>부서별 월 근무시간</span><strong>8월 누계</strong></div></header><DemoBarChart labels={["운영","현장","지원","관리"]} values={[82,96,64,71]} /></section><section className="demo-panel"><header><div><span>직원별 집계</span><strong>근무시간 상위</strong></div></header><DemoTable headers={["직원","정규","연장","합계"]} rows={[["김현우","152h","8h","160h"],["이서윤","148h","6h","154h"],["최민아","151h","2h","153h"]]} /></section></div></>;
    case "chat":
      return <div className="demo-chat-layout"><aside><strong>사내 채팅</strong><button className="active"><b>운영팀</b><small>오늘 현장 일정 확인...</small><i>3</i></button><button><b>전체 공지방</b><small>8월 안전교육 자료</small></button><button><b>관리자방</b><small>월말 정산 확인</small></button></aside><section><header><div><strong>운영팀</strong><span>참여자 8명</span></div><button>파일함</button></header><div className="demo-message-area"><p><small>김현우 · 09:12</small>오늘 강남 현장 일정 확인 부탁드립니다.</p><p className="mine"><small>나 · 09:14</small>확인했습니다. 최신 일정표를 첨부합니다.</p><div className="demo-file-message"><b>현장일정_0818.pdf</b><span>1.8 MB · 파일 받기</span></div><p><small>이서윤 · 09:20</small>성수 현장 인원 1명 변경됐습니다.</p></div><footer><span>메시지를 입력하세요.</span><button>전송</button></footer></section></div>;
    case "files":
      return <><div className="demo-toolbar-row"><div className="demo-search">파일명·등록자 검색</div><button>+ 파일 등록</button></div><div className="demo-file-grid"><article><i>PDF</i><b>안전교육_매뉴얼.pdf</b><span>운영팀 · 2.4MB</span></article><article><i>XLS</i><b>8월_근무일정.xlsx</b><span>관리팀 · 540KB</span></article><article><i>DOC</i><b>현장업무_체크리스트.docx</b><span>현장팀 · 860KB</span></article><article><i>IMG</i><b>현장배치도.png</b><span>운영팀 · 3.1MB</span></article></div></>;
    case "settings":
      return <div className="demo-content-grid settings"><section className="demo-panel demo-brand-setting"><header><div><span>브랜드 설정</span><strong>NOVA WORKS</strong></div></header><div className="demo-logo-swatch">N</div><label>대표 색상 <i className="demo-color-dot" /></label><label>서비스명 <b>NOVA WORKS</b></label></section><section className="demo-panel"><header><div><span>로그인 방식</span><strong>사용 중인 인증</strong></div></header><div className="demo-setting-list"><div><span>이메일·비밀번호</span><Status>사용</Status></div><div><span>사번·비밀번호</span><Status>사용</Status></div><div><span>Google 로그인</span><Status tone="blue">연결됨</Status></div><div><span>2단계 인증</span><Status tone="gray">미사용</Status></div></div></section><section className="demo-panel"><header><div><span>메뉴 권한</span><strong>역할 3개</strong></div></header><div className="demo-permission-grid"><b>대표</b><span>전체 권한</span><b>관리자</b><span>운영·직원·자료</span><b>직원</b><span>본인 근태·채팅</span></div></section></div>;
    case "field-dashboard":
      return <><div className="demo-stat-grid four"><StatCard label="운영 현장" value="6곳" note="진행 4 · 준비 2" /><StatCard label="오늘 배정" value="48명" note="미배정 2명" /><StatCard label="출근 완료" value="87%" note="41명" /><StatCard label="휴무 요청" value="4건" note="승인 필요" /></div><div className="demo-content-grid two"><section className="demo-panel"><header><div><span>현장별 인력 현황</span><strong>실시간 운영</strong></div></header><div className="demo-site-list"><article><i>A</i><div><b>강남 A현장</b><span>12 / 12명 · 출근완료</span></div><Status>정상</Status></article><article><i>B</i><div><b>성수 B현장</b><span>7 / 8명 · 1명 확인중</span></div><Status tone="amber">확인</Status></article><article><i>C</i><div><b>판교 C현장</b><span>9 / 10명 · 배정중</span></div><Status tone="blue">준비</Status></article></div></section><section className="demo-panel"><header><div><span>오늘의 조치사항</span><strong>5건</strong></div></header><ul className="demo-task-list"><li><span>휴무 승인</span><b>김현우 외 2명</b><Status tone="amber">처리 필요</Status></li><li><span>미출근 확인</span><b>성수 B현장 · 1명</b><Status tone="red">긴급</Status></li><li><span>신규 배정</span><b>판교 C현장 · 2명</b><Status tone="blue">진행</Status></li></ul></section></div></>;
    case "organization":
      return <div className="demo-content-grid org"><section className="demo-org-tree"><strong>조직도</strong><div className="root">대표</div><div className="branches"><article><b>운영본부</b><span>12명</span><small>관리자 2명</small></article><article><b>현장1팀</b><span>21명</span><small>팀장 1명</small></article><article><b>현장2팀</b><span>18명</span><small>팀장 1명</small></article></div></section><section className="demo-panel"><header><div><span>직원·권한</span><strong>관리자 범위</strong></div><button>+ 직원 초대</button></header><DemoTable headers={["직원","소속","역할","관리범위"]} rows={[["김현우","운영본부",<Status key="a" tone="blue">관리자</Status>,"전체 현장"],["이서윤","현장1팀",<Status key="b">팀장</Status>,"강남·성수"],["박민준","현장2팀",<Status key="c" tone="gray">직원</Status>,"본인 업무"]]} /></section></div>;
    case "sites":
      return <><div className="demo-toolbar-row"><div className="demo-search">현장명·주소 검색</div><button>+ 현장 등록</button></div><div className="demo-site-card-grid"><article><header><i>A</i><Status>운영중</Status></header><b>강남 A현장</b><p>서울 강남구 테헤란로 00</p><dl><div><dt>필요인원</dt><dd>12명</dd></div><div><dt>담당자</dt><dd>김현우</dd></div><div><dt>운영기간</dt><dd>08.01~12.31</dd></div></dl></article><article><header><i>B</i><Status tone="blue">준비</Status></header><b>성수 B현장</b><p>서울 성동구 아차산로 00</p><dl><div><dt>필요인원</dt><dd>8명</dd></div><div><dt>담당자</dt><dd>이서윤</dd></div><div><dt>운영기간</dt><dd>08.20~11.30</dd></div></dl></article><article><header><i>C</i><Status tone="amber">배정중</Status></header><b>판교 C현장</b><p>경기 성남시 분당구 판교로 00</p><dl><div><dt>필요인원</dt><dd>10명</dd></div><div><dt>담당자</dt><dd>최민아</dd></div><div><dt>운영기간</dt><dd>09.01~12.31</dd></div></dl></article></div></>;
    case "assignments":
      return <><div className="demo-toolbar-row"><div><b>8월 18일 월요일</b><span>현장 4곳 · 직원 48명</span></div><button>배정 저장</button></div><div className="demo-assignment-board"><section><header><b>미배정</b><Status tone="amber">2명</Status></header><article><i>김</i><div><b>김도윤</b><span>현장1팀 · 08:00 가능</span></div></article><article><i>박</i><div><b>박서준</b><span>현장2팀 · 09:00 가능</span></div></article></section><section><header><b>강남 A현장</b><span>12 / 12</span></header><article><i>이</i><div><b>이서윤</b><span>팀장 · 09:00~18:00</span></div></article><article><i>최</i><div><b>최민아</b><span>직원 · 09:00~18:00</span></div></article></section><section><header><b>성수 B현장</b><span>7 / 8</span></header><article><i>정</i><div><b>정우진</b><span>팀장 · 08:30~17:30</span></div></article><div className="demo-drop-zone">직원을 이곳에 배정</div></section></div></>;
    case "attendance-overview":
      return <><div className="demo-stat-grid three"><StatCard label="전체 출근율" value="87%" note="41 / 47명" /><StatCard label="지각" value="3명" note="현장 2곳" /><StatCard label="미확인" value="2명" note="담당자 확인중" /></div><DemoTable headers={["현장","배정","출근","지각","미확인","상태"]} rows={[["강남 A현장","12","12","0","0",<Status key="a">완료</Status>],["성수 B현장","8","7","1","0",<Status key="b" tone="amber">확인</Status>],["판교 C현장","10","8","1","1",<Status key="c" tone="red">미확인</Status>],["송파 D현장","17","14","1","1",<Status key="d" tone="amber">진행</Status>]]} /></>;
    case "leave-approval":
      return <><div className="demo-toolbar-row"><div className="demo-filter-tabs"><button className="active">승인 대기 4</button><button>승인 완료</button><button>반려</button></div><button>휴무 캘린더</button></div><div className="demo-leave-list"><article><div><i>김</i><span><b>김현우</b><small>연차 · 8월 22일</small></span></div><p>개인 일정으로 연차를 신청합니다.</p><aside><button>반려</button><button>승인</button></aside></article><article><div><i>이</i><span><b>이서윤</b><small>반차 · 8월 19일 오후</small></span></div><p>병원 방문 예정입니다.</p><aside><button>반려</button><button>승인</button></aside></article><article><div><i>박</i><span><b>박민준</b><small>연차 · 8월 25일</small></span></div><p>대체인력 배정 필요</p><aside><button>반려</button><button>승인</button></aside></article></div></>;
    case "notices":
      return <><div className="demo-toolbar-row"><div className="demo-filter-tabs"><button className="active">전체 공지</button><button>필수 확인</button><button>예약 발송</button></div><button>+ 공지 작성</button></div><div className="demo-notice-grid"><article><header><Status tone="red">필수</Status><span>08.18 09:00</span></header><b>8월 현장 안전교육 안내</b><p>모든 현장 직원은 첨부된 안전교육 자료를 확인해 주세요.</p><footer><span>확인 41 / 48명</span><i><em style={{ width: "85%" }} /></i></footer></article><article><header><Status tone="blue">일반</Status><span>08.17 16:20</span></header><b>근무복 지급 일정</b><p>본사 및 각 현장별 지급 일정을 확인해 주세요.</p><footer><span>확인 32 / 48명</span><i><em style={{ width: "67%" }} /></i></footer></article></div></>;
    case "mobile-home":
      return <div className="demo-phone-page"><header><div><small>좋은 아침입니다</small><b>김현우님</b></div><span>●</span></header><section className="demo-phone-hero"><small>오늘 배정 현장</small><strong>강남 A현장</strong><p>09:00 - 18:00 · 운영팀</p><Status>배정 확정</Status></section><div className="demo-phone-quick"><button><i>QR</i><b>출퇴근</b></button><button><i>休</i><b>휴무신청</b></button><button><i>公</i><b>공지</b></button></div><section className="demo-phone-card"><header><b>오늘의 업무</b><span>전체보기</span></header><p>09:00 현장 점검 및 인원 확인</p><p>15:00 일일 업무보고 등록</p></section></div>;
    case "mobile-qr":
      return <div className="demo-phone-page qr"><header><button>‹</button><b>QR 출퇴근</b><span /></header><div className="demo-mobile-scanner"><i /><i /><i /><i /><div>▦</div></div><strong>회사 또는 현장 QR을 스캔해 주세요</strong><p>현재 위치 · 강남 A현장<br />오늘 첫 스캔은 출근으로 기록됩니다.</p><button className="demo-phone-primary">카메라 권한 허용</button></div>;
    case "mobile-task":
      return <div className="demo-phone-page"><header><button>‹</button><b>오늘의 업무</b><span>⋮</span></header><div className="demo-task-timeline"><article className="done"><time>08:50</time><div><b>현장 도착·QR 출근</b><span>완료</span></div></article><article className="active"><time>09:00</time><div><b>현장 인원·장비 확인</b><span>진행중</span><p>점검 체크리스트 8개</p></div></article><article><time>15:00</time><div><b>업무보고 등록</b><span>대기</span><p>사진 3장 첨부 필요</p></div></article></div><button className="demo-phone-primary">진행 업무 열기</button></div>;
    case "mobile-leave":
      return <div className="demo-phone-page form"><header><button>‹</button><b>휴무 신청</b><span /></header><label>휴무 종류<div>연차 <span>⌄</span></div></label><label>사용 날짜<div>2026.08.22 <span>▣</span></div></label><label>신청 사유<textarea value="개인 일정으로 연차를 신청합니다." readOnly /></label><aside><span>잔여 연차</span><b>8.5일</b></aside><button className="demo-phone-primary">신청하기</button></div>;
    case "mobile-notice":
      return <div className="demo-phone-page"><header><button>‹</button><b>공지사항</b><span /></header><div className="demo-mobile-list"><article><Status tone="red">필수</Status><b>8월 현장 안전교육 안내</b><p>모든 현장 직원은 교육자료를 확인해 주세요.</p><span>오늘 09:00 · 첨부 1개</span></article><article><Status tone="blue">일반</Status><b>근무복 지급 일정</b><p>현장별 지급 장소를 확인해 주세요.</p><span>어제 16:20</span></article></div></div>;
    case "mobile-alerts":
      return <div className="demo-phone-page"><header><button>‹</button><b>알림</b><span>모두 읽음</span></header><div className="demo-alert-list"><article className="unread"><i>배</i><div><b>현장 배정이 변경되었습니다.</b><p>성수 B현장 → 강남 A현장</p><span>5분 전</span></div></article><article className="unread"><i>休</i><div><b>휴무 신청이 승인되었습니다.</b><p>8월 22일 연차</p><span>1시간 전</span></div></article><article><i>公</i><div><b>새 공지가 등록되었습니다.</b><p>8월 현장 안전교육 안내</p><span>오늘 09:00</span></div></article></div></div>;
    case "mobile-profile":
      return <div className="demo-phone-page profile"><header><button>‹</button><b>내정보</b><span>설정</span></header><div className="demo-profile-card"><i>김</i><b>김현우</b><span>운영본부 · 팀장</span><small>사번 E-1004</small></div><div className="demo-profile-stats"><div><span>이번달 근무</span><b>152시간</b></div><div><span>잔여 연차</span><b>8.5일</b></div></div><div className="demo-setting-list"><div><span>연락처</span><b>010-****-1234</b></div><div><span>소속 현장</span><b>강남 A현장</b></div><div><span>비밀번호 변경</span><b>›</b></div></div></div>;
    case "inventory-dashboard":
      return <><div className="demo-stat-grid four"><StatCard label="총 품목" value="1,248" note="활성 1,197" /><StatCard label="안전재고 미달" value="16" note="조치 필요" /><StatCard label="오늘 입고" value="124" note="7건" /><StatCard label="승인 대기" value="5" note="발주 3 · 문서 2" /></div><div className="demo-content-grid two"><section className="demo-panel"><header><div><span>입출고 추이</span><strong>최근 7일</strong></div><Status tone="blue">실시간</Status></header><DemoBarChart labels={["월","화","수","목","금","토","일"]} values={[52,78,63,91,74,45,32]} /></section><section className="demo-panel"><header><div><span>안전재고 미달</span><strong>우선 보충 품목</strong></div></header><DemoTable headers={["품목","창고","현재고","기준"]} rows={[["자재 B-042","제2창고",<Status key="a" tone="red">18</Status>,"50"],["부품 C-118","본사창고",<Status key="b" tone="amber">24</Status>,"40"],["포장재 P-020","제1창고",<Status key="c" tone="amber">110</Status>,"150"]]} /></section></div></>;
    case "products":
      return <><div className="demo-toolbar-row"><div className="demo-search">품목명·코드·거래처 검색</div><button>+ 품목 등록</button></div><DemoTable headers={["품목코드","품목명","분류","단가","안전재고","상태"]} rows={[["A-120","메인 부품 A","부품","32,000원","120",<Status key="a">사용</Status>],["B-042","원자재 B","원자재","8,400원","50",<Status key="b">사용</Status>],["P-020","포장재 20호","포장재","1,250원","150",<Status key="c" tone="blue">사용</Status>],["C-118","연결 부품 C","부품","5,800원","40",<Status key="d" tone="gray">중지</Status>]]} /></>;
    case "warehouses":
      return <><div className="demo-stat-grid three"><StatCard label="전체 재고자산" value="2.84억" note="전월 +3.2%" /><StatCard label="창고 간 이동" value="18건" note="오늘" /><StatCard label="재고 정확도" value="98.7%" note="실사 기준" /></div><div className="demo-warehouse-grid"><article><header><i>01</i><Status>정상</Status></header><b>본사창고</b><p>품목 842개 · 재고 18,420개</p><div><span>사용률</span><b>72%</b><i><em style={{ width: "72%" }} /></i></div></article><article><header><i>02</i><Status tone="amber">확인</Status></header><b>제1창고</b><p>품목 516개 · 재고 9,280개</p><div><span>사용률</span><b>88%</b><i><em style={{ width: "88%" }} /></i></div></article><article><header><i>03</i><Status>정상</Status></header><b>제2창고</b><p>품목 394개 · 재고 6,150개</p><div><span>사용률</span><b>61%</b><i><em style={{ width: "61%" }} /></i></div></article></div></>;
    case "orders":
      return <div className="demo-order-board"><section><header><b>요청</b><span>3</span></header><article><small>PR-26048</small><b>자재 B 외 4종</b><p>예상 4,820,000원</p><span>김현우 · 오늘</span></article></section><section><header><b>승인 대기</b><span>2</span></header><article><small>PO-26018</small><b>부품 A-120 외 2종</b><p>예상 12,400,000원</p><span>결재선 2 / 3</span></article><article><small>PO-26019</small><b>포장재 20호</b><p>예상 1,250,000원</p><span>결재선 1 / 2</span></article></section><section><header><b>발주 완료</b><span>5</span></header><article><small>PO-26014</small><b>연결 부품 C</b><p>입고예정 08.20</p><Status>완료</Status></article></section></div>;
    case "approvals":
      return <div className="demo-content-grid approval"><section className="demo-panel"><header><div><span>승인 대기 문서</span><strong>5건</strong></div></header><div className="demo-approval-list"><button className="active"><span>발주서</span><b>#PO-26018</b><small>12,400,000원</small></button><button><span>재고조정</span><b>#AD-26007</b><small>수량 -12</small></button><button><span>거래처등록</span><b>새빛산업</b><small>신규</small></button></div></section><section className="demo-document-preview"><header><div><small>발주서 #PO-26018</small><b>부품 A-120 외 2종</b></div><Status tone="amber">승인 대기</Status></header><dl><div><dt>요청부서</dt><dd>구매팀</dd></div><div><dt>거래처</dt><dd>한빛부품</dd></div><div><dt>합계금액</dt><dd>12,400,000원</dd></div><div><dt>납품일</dt><dd>2026.08.22</dd></div></dl><div className="demo-approval-steps"><span className="done">담당자 완료</span><span className="active">팀장 검토</span><span>대표 승인</span></div><footer><button>반려</button><button>승인</button></footer></section></div>;
    case "inventory-stats":
      return <><div className="demo-stat-grid three"><StatCard label="재고 회전율" value="6.8회" note="전월 6.2회" /><StatCard label="재고 미달률" value="1.3%" note="목표 2% 이하" /><StatCard label="평균 입고 리드타임" value="3.2일" note="전월 -0.4일" /></div><div className="demo-content-grid two"><section className="demo-panel"><header><div><span>월별 입출고</span><strong>2026년</strong></div></header><DemoBarChart labels={["3월","4월","5월","6월","7월","8월"]} values={[54,62,71,66,83,75]} /></section><section className="demo-panel"><header><div><span>거래처별 발주</span><strong>상위 5개사</strong></div></header><div className="demo-ranking-list"><div><b>한빛부품</b><i><em style={{ width: "92%" }} /></i><span>38%</span></div><div><b>새빛산업</b><i><em style={{ width: "71%" }} /></i><span>26%</span></div><div><b>정우상사</b><i><em style={{ width: "48%" }} /></i><span>18%</span></div></div></section></div></>;
    case "mobile-scan":
      return <div className="demo-phone-page qr stock"><header><button>‹</button><b>바코드 스캔</b><span>⌁</span></header><div className="demo-mobile-scanner dark"><i /><i /><i /><i /><div>|||| || |||||</div></div><strong>품목 또는 LOT 바코드를 스캔하세요</strong><p>스캔하면 품목정보와 현재고가 자동으로 표시됩니다.</p><div className="demo-phone-quick two"><button><i>入</i><b>입고</b></button><button><i>出</i><b>출고</b></button></div></div>;
    case "mobile-stock-in":
      return <div className="demo-phone-page form"><header><button>‹</button><b>입고 등록</b><span /></header><div className="demo-item-found"><i>A</i><div><b>부품 A-120</b><span>현재고 380 · 본사창고</span></div></div><label>입고 수량<div>120 <span>개</span></div></label><label>입고 창고<div>본사창고 <span>⌄</span></div></label><label>LOT 번호<div>LOT-260818-A12</div></label><button className="demo-phone-primary">입고 등록</button></div>;
    case "mobile-stock-out":
      return <div className="demo-phone-page form"><header><button>‹</button><b>출고 등록</b><span /></header><div className="demo-item-found"><i>B</i><div><b>자재 B-042</b><span>현재고 84 · 제2창고</span></div></div><label>출고 수량<div>24 <span>개</span></div></label><label>출고처<div>성남 생산라인 <span>⌄</span></div></label><aside className="warning"><span>출고 후 재고</span><b>60개</b></aside><button className="demo-phone-primary">출고 확인</button></div>;
    case "mobile-stock-lookup":
      return <div className="demo-phone-page"><header><button>‹</button><b>재고 조회</b><span>⌕</span></header><div className="demo-mobile-search">품목명 또는 코드 검색</div><div className="demo-mobile-stock-list"><article><i>A</i><div><b>부품 A-120</b><span>총 380개</span><small>본사 250 · 제1창고 130</small></div><Status>정상</Status></article><article><i>B</i><div><b>자재 B-042</b><span>총 18개</span><small>제2창고 18</small></div><Status tone="red">미달</Status></article><article><i>P</i><div><b>포장재 P-020</b><span>총 110개</span><small>제1창고 110</small></div><Status tone="amber">주의</Status></article></div></div>;
    case "mobile-lot":
      return <div className="demo-phone-page"><header><button>‹</button><b>LOT 이력</b><span /></header><div className="demo-lot-card"><small>LOT NUMBER</small><b>LOT-260818-A12</b><span>부품 A-120 · 120개</span></div><div className="demo-task-timeline lot"><article className="done"><time>08.18</time><div><b>본사창고 입고</b><span>김현우 · 09:42</span></div></article><article className="done"><time>08.19</time><div><b>제1창고 이동</b><span>이서윤 · 11:18</span></div></article><article className="active"><time>08.20</time><div><b>생산라인 출고예정</b><span>24개 · 승인완료</span></div></article></div></div>;
    case "mobile-stock-alerts":
      return <div className="demo-phone-page"><header><button>‹</button><b>작업 알림</b><span>설정</span></header><div className="demo-alert-list"><article className="unread"><i>!</i><div><b>안전재고 미달</b><p>자재 B-042 · 현재 18 / 기준 50</p><span>5분 전</span></div></article><article className="unread"><i>入</i><div><b>입고 요청이 승인되었습니다.</b><p>부품 A-120 · 120개</p><span>42분 전</span></div></article><article><i>出</i><div><b>출고 작업이 배정되었습니다.</b><p>포장재 P-020 · 80개</p><span>오늘 08:30</span></div></article></div></div>;
    case "pc-transactions":
      return <div className="demo-pc-workspace"><div className="demo-pc-form"><header><b>입출고 신규 처리</b><span>F2 저장 · F4 초기화</span></header><label>구분<select><option>입고</option></select></label><label>품목코드<input value="A-120" readOnly /></label><label>창고<select><option>본사창고</option></select></label><label>수량<input value="120" readOnly /></label><button>처리 목록에 추가</button></div><section><header><div><span>오늘 처리 목록</span><strong>18건</strong></div><button>전체 저장</button></header><DemoTable headers={["구분","품목","창고","수량","담당"]} rows={[[<Status key="a" tone="blue">입고</Status>,"부품 A-120","본사창고","120","김현우"],[<Status key="b" tone="amber">출고</Status>,"자재 B-042","제2창고","24","이서윤"],[<Status key="c" tone="blue">입고</Status>,"포장재 P-020","제1창고","300","박민준"]]} /></section></div>;
    case "pc-purchase":
      return <div className="demo-paper-document"><header><div><small>STOCK FLOW</small><b>발 주 서</b></div><dl><div><dt>발주번호</dt><dd>PO-26018</dd></div><div><dt>발행일</dt><dd>2026.08.18</dd></div></dl></header><section><div><span>공급처</span><b>한빛부품 주식회사</b></div><div><span>납품장소</span><b>본사창고</b></div><div><span>납품요청일</span><b>2026.08.22</b></div></section><DemoTable headers={["품목","수량","단가","공급가액"]} rows={[["부품 A-120","300","32,000","9,600,000"],["연결 부품 C","400","5,800","2,320,000"],["운송비","1","480,000","480,000"]]} /><footer><span>합계</span><b>12,400,000원</b></footer></div>;
    case "pc-statement":
      return <div className="demo-paper-document statement"><header><div><small>거래번호 ST-260818-04</small><b>거 래 명 세 서</b></div><dl><div><dt>공급받는 자</dt><dd>성남 생산라인</dd></div><div><dt>출고일</dt><dd>2026.08.18</dd></div></dl></header><DemoTable headers={["품목","수량","단가","금액"]} rows={[["부품 A-120","24","32,000","768,000"],["자재 B-042","80","8,400","672,000"],["포장재 P-020","120","1,250","150,000"]]} /><footer><span>총 공급가액</span><b>1,590,000원</b></footer><div className="demo-doc-actions"><button>PDF 저장</button><button>인쇄</button></div></div>;
    case "pc-labels":
      return <div className="demo-label-workspace"><aside><strong>라벨 출력 설정</strong><label>라벨 규격<select><option>40 × 30 mm</option></select></label><label>출력 품목<select><option>부품 A-120</option></select></label><label>출력 수량<input value="8" readOnly /></label><button>미리보기 새로고침</button></aside><section><header><b>인쇄 미리보기</b><span>8 labels</span></header><div className="demo-label-grid">{Array.from({length:8}).map((_,i)=><article key={i}><small>STOCK FLOW</small><b>A-120</b><div>||||| || ||||</div><span>LOT-260818-A12</span></article>)}</div><footer><button>프린터 설정</button><button>라벨 출력</button></footer></section></div>;
    case "pc-import":
      return <div className="demo-import-workspace"><header><span>1. 파일 선택</span><span className="active">2. 데이터 검증</span><span>3. 등록 완료</span></header><div className="demo-import-summary"><StatCard label="전체 행" value="1,248" /><StatCard label="정상" value="1,221" /><StatCard label="확인 필요" value="27" /></div><DemoTable headers={["행","품목코드","품목명","검증결과"]} rows={[["12","A-120","메인 부품 A",<Status key="a">정상</Status>],["48","B-042","원자재 B",<Status key="b" tone="amber">단가 확인</Status>],["107","-","포장재 20호",<Status key="c" tone="red">코드 누락</Status>]]} /><footer><button>오류 파일 받기</button><button>정상 1,221건 등록</button></footer></div>;
    case "pc-approvals":
      return <div className="demo-pc-approval"><aside><header><b>결재 대기</b><span>5</span></header><button className="active"><small>발주서</small><b>PO-26018</b><span>12,400,000원</span></button><button><small>재고조정</small><b>AD-26007</b><span>수량 -12</span></button><button><small>거래처등록</small><b>새빛산업</b><span>신규</span></button></aside><section><header><div><small>발주서 PO-26018</small><b>한빛부품 · 부품 A-120 외 2종</b></div><Status tone="amber">팀장 승인 대기</Status></header><div className="demo-doc-summary"><span>요청부서 <b>구매팀</b></span><span>납품일 <b>08.22</b></span><span>합계 <b>12,400,000원</b></span></div><div className="demo-approval-steps"><span className="done">담당자 완료</span><span className="active">팀장 검토</span><span>대표 승인</span></div><textarea value="검토 의견을 입력하세요." readOnly /><footer><button>반려</button><button>승인</button></footer></section></div>;
    default:
      return <div className="demo-empty-screen"><b>화면 예시</b><p>선택한 업무 메뉴의 대표 레이아웃입니다.</p></div>;
  }
}

export default function WorkcraftPackageDemo({ demoId, onClose, onApply }: Props) {
  const demo = DEMOS[demoId];
  const [platformId, setPlatformId] = useState<DemoPlatformId>(demo.platforms[0].id);
  const [screenId, setScreenId] = useState(demo.platforms[0].screens[0].id);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const firstPlatform = demo.platforms[0];
    setPlatformId(firstPlatform.id);
    setScreenId(firstPlatform.screens[0].id);
  }, [demo]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const platform = useMemo(() => demo.platforms.find((item) => item.id === platformId) ?? demo.platforms[0], [demo, platformId]);
  const screen = useMemo(() => platform.screens.find((item) => item.id === screenId) ?? platform.screens[0], [platform, screenId]);

  function changePlatform(nextId: DemoPlatformId) {
    const next = demo.platforms.find((item) => item.id === nextId);
    if (!next) return;
    setPlatformId(next.id);
    setScreenId(next.screens[0].id);
  }

  return (
    <div className={`workcraft-demo-overlay demo-${demo.id}`} role="presentation" onMouseDown={onClose}>
      <section className="workcraft-demo-dialog" role="dialog" aria-modal="true" aria-labelledby="workcraft-demo-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="workcraft-demo-header">
          <div>
            <span>INTERACTIVE SCREEN SIMULATION</span>
            <h2 id="workcraft-demo-title">{demo.title}</h2>
            <p>{demo.subtitle}</p>
          </div>
          <button ref={closeRef} type="button" className="workcraft-demo-close" onClick={onClose} aria-label="화면 예시 닫기">×</button>
        </header>

        <div className="workcraft-demo-packagebar">
          <div><b>{demo.code}</b><span>대표 구성 예시 · 샘플 데이터</span></div>
          <nav aria-label="예시 플랫폼 선택">
            {demo.platforms.map((item) => <button type="button" key={item.id} className={platformId === item.id ? "active" : ""} onClick={() => changePlatform(item.id)}>{item.label}</button>)}
          </nav>
        </div>

        <div className={`workcraft-demo-layout platform-${platform.id}`}>
          <aside className="workcraft-demo-nav">
            <div className="workcraft-demo-brand"><i>{demo.brand.slice(0, 1)}</i><span><b>{demo.brand}</b><small>{platform.label}</small></span></div>
            <p>{platform.caption}</p>
            <div className="workcraft-demo-menu">
              {platform.screens.map((item, index) => <button type="button" key={item.id} className={screenId === item.id ? "active" : ""} onClick={() => setScreenId(item.id)}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</button>)}
            </div>
          </aside>

          <main className="workcraft-demo-main">
            <div className="workcraft-demo-screen-head">
              <div><span>{platform.label} · {screen.label}</span><h3>{screen.title}</h3><p>{screen.description}</p></div>
              <div className="workcraft-demo-live"><i /> SCREEN PREVIEW</div>
            </div>

            <div className={`workcraft-demo-preview preview-${platform.id}`}>
              {platform.id === "web" && <div className="workcraft-demo-browser"><div><i /><i /><i /><span>https://{demo.brand.toLowerCase().replaceAll(" ", "-")}.workcraft.app/{screen.id}</span></div><section><DemoScreenContent kind={screen.kind} /></section></div>}
              {platform.id === "app" && <div className="workcraft-demo-mobile-stage"><div className="workcraft-demo-phone"><div className="workcraft-demo-phone-top"><i /></div><section><DemoScreenContent kind={screen.kind} /></section><div className="workcraft-demo-phone-home" /></div><aside><span>APP RESULT</span><h4>{screen.title}</h4><p>{screen.outcome}</p><ul><li>고객사 로고·대표색상 적용</li><li>실제 업무용어와 입력항목으로 변경</li><li>Web 데이터와 실시간 연동</li></ul></aside></div>}
              {platform.id === "pc" && <div className="workcraft-demo-window"><header><span><i>{demo.brand.slice(0, 1)}</i>{demo.brand} Windows 업무 클라이언트</span><b>—　□　×</b></header><section><DemoScreenContent kind={screen.kind} /></section></div>}
            </div>

            <div className="workcraft-demo-result"><div><span>이 메뉴를 구현하면</span><p>{screen.outcome}</p></div><div><span>실제 구축 시 변경 가능</span><p>로고·색상·메뉴·입력항목·권한·계산식·화면 배치</p></div></div>
          </main>
        </div>

        <footer className="workcraft-demo-footer">
          <p><b>화면 구성 예시입니다.</b> 실제 고객 데이터나 고정 템플릿이 아니며, 현장진단 후 고객사의 업무 순서와 브랜드에 맞춰 설계됩니다.</p>
          <div><button type="button" className="button button-ghost" onClick={onClose}>닫기</button><button type="button" className="button button-primary" onClick={onApply}>이 구성으로 견적에 담기</button></div>
        </footer>
      </section>
    </div>
  );
}
