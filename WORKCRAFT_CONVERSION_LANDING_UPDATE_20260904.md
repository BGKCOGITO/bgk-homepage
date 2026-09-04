# WORKCRAFT 전환용 랜딩페이지 업데이트 · 2026-09-04

## 대상
- BGK 홈페이지 `/business`

## 목적
광고 유입 고객이 긴 설명과 상세 가격표에서 이탈하지 않고, 먼저 예상금액을 확인하거나 최소한 카카오톡·전화 문의까지 진행하도록 전환 흐름을 단축했습니다.

## 변경된 유입 흐름
기존:

`광고 → BGK /business 장문 소개 → 상세 기능 가격표 → WORKCRAFT 예상견적 → 5단계 작성`

변경:

`광고 → BGK /business 전환 랜딩 → 30초 예상견적 → 금액 확인 → 필요할 때만 무료 상담 요청`

## 주요 변경사항
- 첫 화면 문구를 `엑셀·카톡·수기 업무를 회사 전용 시스템으로 바꿔드립니다`로 변경
- 첫 화면과 상단에 `30초 예상견적`, `카카오 문의`, `전화 상담` CTA 배치
- `연락처 없이 가격 먼저`, `약 30초`, `상담 요청 무료`, `문의만으로 계약되지 않음` 안내 강화
- 모바일 하단에 `카카오 문의 / 30초 예상견적` 고정 버튼 추가
- 기존의 긴 프로모션 제외문구는 핵심 조건만 남긴 소형 안내로 축소
- 개발용어 대신 실제 불편한 업무를 기준으로 상담한다는 메시지 추가
- WORKCRAFT 3단계 간편견적 실제 화면을 순서대로 노출
- 실제 구축사례 `DELIVO`, `PAWU`를 신뢰요소로 배치
- 상세 추가기능 가격표 제거, 기본 구축 시작가 390만/690만/990만원만 표시
- 기능별 금액은 WORKCRAFT 실제 간편견적에서 확인하도록 일원화
- FAQ를 통해 문의·계약 부담을 낮춤
- CTA 클릭 이벤트 추가
  - `workcraft_landing_quote_click`
  - `workcraft_landing_kakao_click`
  - `workcraft_landing_phone_click`
  - `workcraft_landing_view`
- WORKCRAFT 이동 URL에 유입 분석용 UTM 추가
  - `utm_source=bgk_business`
  - `utm_medium=landing`
  - `utm_campaign=workcraft_quick_quote`

## 추가 파일
- `components/WorkcraftLandingCta.tsx`
- `public/images/workcraft-landing/quote-step1.webp`
- `public/images/workcraft-landing/quote-step2.webp`
- `public/images/workcraft-landing/quote-step3.webp`
- `public/images/workcraft-landing/delivo-dashboard.webp`

## 배포 순서
1. `BGK-WorkCraft-Web-v1.5.0-QuickQuote-LeadOptimized.zip`을 기존 WorkCraft 프로젝트에 먼저 적용·배포
2. 본 BGK 홈페이지 교체본을 배포
3. 광고 최종 URL을 상황에 따라 아래 중 하나로 설정
   - 신뢰 설명까지 포함: `https://bgkcogito.co.kr/business`
   - 바로 견적 진입: `https://workcraft.bgkcogito.co.kr/#/quote`

## 배포 명령
```powershell
npm install
npm run build
vercel --prod
```
