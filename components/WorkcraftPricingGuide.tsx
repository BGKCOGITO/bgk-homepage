const WORKCRAFT_QUOTE_URL = "https://workcraft.bgkcogito.co.kr/#/quote";

const plans = [
  {
    code: "WORKCRAFT CORE",
    label: "CORE",
    title: "웹 업무시스템 구축형",
    platform: "Web",
    price: "390만원~",
    description: "회사 내부 업무를 관리하는 반응형 Web과 관리자 시스템을 구축합니다.",
    items: ["고객사 브랜딩", "대표·관리자·사용자 권한", "기본 업무 모듈 1종", "검색·필터·표준 엑셀 저장", "운영 배포·30일 무상 하자보수"],
  },
  {
    code: "WORKCRAFT CONNECT",
    label: "CONNECT",
    title: "웹·앱 현장 연결형",
    platform: "Web + Android App 1종",
    price: "690만원~",
    description: "관리자 Web과 현장 직원·고객·기사용 Android App 1종을 하나의 데이터로 연결합니다.",
    items: ["CORE 기본 구성", "Android App 1종", "기본 푸시알림", "Web·App 데이터 연동", "스토어 제출 파일 구성·최초 등록 지원"],
  },
  {
    code: "WORKCRAFT SUITE",
    label: "SUITE",
    title: "웹·앱·Windows 통합 운영형",
    platform: "Web + Android App + Windows 업무 클라이언트",
    price: "990만원~",
    description: "Web·모바일 App·Windows 업무 클라이언트를 하나의 권한과 업무 흐름으로 연결합니다.",
    items: ["CONNECT 기본 구성", "Windows 업무 클라이언트 1종", "통합 데이터베이스", "통합 로그인·권한·업무흐름", "버전·배포 환경 구성"],
  },
] as const;

const addonGroups = [
  {
    title: "인사·현장·정산",
    items: [
      ["직원·조직·세부 권한", "150만원~"], ["QR 출퇴근", "180만원~"], ["연차·휴무 신청 승인", "150만원~"],
      ["현장·업무·직원 배정", "200만원~"], ["급여·수당·정산", "280만원~"], ["명세서·정산서 PDF", "120만원~"],
    ],
  },
  {
    title: "재고·문서·업무관리",
    items: [
      ["재고·입출고 기본관리", "320만원~"], ["바코드·다중창고·LOT 추적", "250만원~"], ["전자문서·결재·보관", "220만원~"],
      ["공지·업무지시·확인", "120만원~"], ["사내 채팅·파일 전송", "350만원~"], ["운영통계·대시보드", "180만원~"],
      ["예약·일정·캘린더", "200만원~"], ["고객·거래처 관리(CRM)", "200만원~"], ["견적·발주·주문 관리", "250만원~"],
    ],
  },
  {
    title: "알림·연동·고급기능",
    items: [
      ["푸시알림·화면 바로가기", "120만원~"], ["결제·구독관리 연동", "320만원~"], ["소셜 로그인 1종", "80만원~"],
      ["문자·알림톡 연동", "120만원~"], ["외부 API 연동 1종", "180만원~"], ["지도·위치·현장 체크인", "200만원~"],
      ["기존 데이터 이전", "200만원~"], ["AI 요약·분류·문서 초안", "300만원~"], ["추가 앱·운영체제 1종", "350만원~"],
      ["여러 회사·지점 분리관리", "350만원~"], ["고급 로그·보안·승인이력", "250만원~"],
    ],
  },
] as const;

export default function WorkcraftPricingGuide() {
  return (
    <div className="workcraft-pricing-guide">
      <div className="pricing-plan-grid-static">
        {plans.map((plan) => (
          <article className="pricing-plan-static" key={plan.code}>
            <span className="pricing-plan-label">{plan.label}</span>
            <h3>{plan.code}</h3>
            <p className="pricing-plan-title">{plan.title}</p>
            <b className="pricing-plan-platform">{plan.platform}</b>
            <strong className="pricing-plan-price">{plan.price}</strong>
            <p className="pricing-plan-description">{plan.description}</p>
            <ul>{plan.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>

      <div className="pricing-addon-static">
        <div className="pricing-addon-intro">
          <div>
            <span>OPTION GUIDE</span>
            <h3>추가 기능 가격 안내</h3>
          </div>
          <p>아래 금액은 초기 범위 확인을 위한 시작가입니다. 실제 금액은 화면 수, 정책, 데이터 구조와 외부 연동 난이도에 따라 달라집니다.</p>
        </div>
        {addonGroups.map((group) => (
          <section className="pricing-addon-group-static" key={group.title}>
            <h4>{group.title}</h4>
            <div className="pricing-addon-grid-static">
              {group.items.map(([name, price]) => (
                <div className="pricing-addon-item-static" key={name}>
                  <span>{name}</span><strong>{price}</strong>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="pricing-external-cta">
        <div>
          <span>WORKCRAFT ESTIMATE</span>
          <h3>실제 예상견적 발행은 WORKCRAFT에서 진행합니다.</h3>
          <p>BGK 홈페이지는 서비스와 가격을 안내하는 소개 페이지입니다. 견적 작성·발행·저장은 WORKCRAFT 전용 시스템에서 한 번에 관리됩니다.</p>
        </div>
        <a className="button button-primary" href={WORKCRAFT_QUOTE_URL} target="_blank" rel="noreferrer">WORKCRAFT에서 예상견적 시작</a>
      </div>
    </div>
  );
}
