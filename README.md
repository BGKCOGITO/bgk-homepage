# BGK Corporate Website · WORKCRAFT

BGK 공식 홈페이지와 기업 현장진단형 맞춤 구축 서비스 `BGK WORKCRAFT` 페이지입니다.

## 주요 구성

- `/` — BGK 기업 홈페이지
- `/business` — WORKCRAFT 서비스·프로모션·가격 안내. 예상견적은 `https://workcraft.bgkcogito.co.kr/#/quote`로 이동
- `/privacy` — 개인정보처리방침
- `/api/business-inquiry` — Resend 기반 현장진단 신청 접수 API

## 실행

```powershell
npm install
npm run dev
```

## 배포 전 환경변수

```env
RESEND_API_KEY=re_...
BGK_RESEND_FROM=BGK 홈페이지 <inquiry@mail.bgkcogito.co.kr>
BGK_INQUIRY_TO=bgkcogito@naver.com
```

`.env.local`은 ZIP에 포함하지 않으며 기존 파일을 복사해 사용합니다.

## 2026-08-28 사회공헌 영역
- 별도 앱이나 독립 서비스가 아닌 BGK 홈페이지 회사소개 내부의 보조 영역으로 추가했습니다.
- 현재 외부 후원은 받지 않으며 BGK 자체 비용으로 시작한다는 안내를 표시합니다.
- 6.25 참전유공자 및 아동·아동복지시설 지원을 우선 분야로 표시합니다.
- 실제 지원 활동 전에는 0원/0건을 전면에 노출하지 않습니다.
- 실제 활동이 시작되면 지원 지역·내용·금액만 간단히 기록하고 대상자 개인정보는 공개하지 않습니다.
- 기존 BGK Support Supabase는 내부 관리 DB로 유지하며 홈페이지와의 실데이터 연결은 첫 활동 등록 단계에서 진행합니다.
