export const workcraftPromotion = {
  totalSlots: 10,
  remainingSlots: 10,
  title: "출시 기념 · 선착순 10개 기업",
  benefit: "추가 기능 1개 개발비 100% 지원",
  benefitDetail: "최종 계약서에 포함되는 추가 기능 중 원하는 1개를 선택할 수 있으며, 홈페이지에 표시된 옵션 금액의 상한은 없습니다.",
  eligibility: [
    "WORKCRAFT 신규 유료 구축 계약 기업",
    "기업당 1회 · 추가 기능 1개",
    "최종 견적·개발범위서(SOW)에 포함된 옵션 기준",
  ],
  exclusions: [
    "CORE·CONNECT·SUITE 기본 구축 패키지 비용",
    "월 유지관리비와 계약 후 추가·변경 개발",
    "외부 서비스 이용료·사용량 과금·라이선스·등록비 등 제3자 비용(클라우드·도메인·문자/알림톡·PG·지도·AI API·앱스토어 등)",
    "선택 옵션의 표준 개발범위를 넘어서는 별도 맞춤 요구사항",
    "숙박·항공 등 별도 실비가 필요한 장거리 현장진단 비용(발생 시 사전 안내)",
    "다른 할인·프로모션과의 중복 적용",
  ],
  countRule: "잔여 수량은 최종 계약서 체결 및 계약금 확인 순서로 차감되며, 온라인 견적 발행이나 현장진단 신청만으로 자리가 예약되지 않습니다.",
} as const;

export const workcraftPromotionOpen = workcraftPromotion.remainingSlots > 0;
