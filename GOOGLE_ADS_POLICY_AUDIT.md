# BGK WORKCRAFT Google Ads 정책 정지 점검 및 수정 기록

점검 기준: `BGK-homepage-GoogleAds-conversion-EXACT-fix(1).zip`
수정일: 2026-08-20
대상 정책 알림: `시스템 우회: 클로킹`

## 1. 소스 점검 결과

현재 소스에서는 Google이나 특정 사용자에게 다른 랜딩 콘텐츠를 보여주는 전형적인 클로킹 로직을 찾지 못했습니다.

확인한 항목:
- Googlebot / AdsBot / User-Agent 조건 분기 없음
- IP / 지역 / referrer / gclid / 광고 유입 여부에 따른 콘텐츠 분기 없음
- Next.js middleware 없음
- `next.config.ts` redirect / rewrite 없음
- `robots.txt` 전체 허용
- `/business` 페이지의 가격·서비스·신청 절차는 정적/공통 콘텐츠
- Google Ads 전환은 현장진단 API가 성공한 뒤에만 호출

따라서 소스만 보면 의도적인 클로킹이 직접 원인이라고 볼 근거는 없습니다.

## 2. 정책 오탐 또는 위험 신호가 될 수 있었던 부분

### A. 제한 업종으로 오인될 수 있는 데스크톱 소프트웨어 표현
기존 페이지에는 `PC Program`, `Windows Program`, `설치파일`, `APK`, `AAB` 등 배포형 소프트웨어로 오인될 수 있는 표현이 다수 있었습니다.
Google Ads에서도 정지 전 `무료 데스크톱 소프트웨어` 정책 제한이 먼저 표시된 이력이 있으므로, 자동 분류가 WORKCRAFT의 실제 서비스 성격(기업별 유료 맞춤 개발·구축)을 잘못 해석했을 가능성이 있습니다.

### B. 전환 스니펫의 redirect 가능 콜백
Google Ads가 제공한 예시를 따라 `gtag_report_workcraft_lead_conversion(url)` 내부에 `window.location = url` 코드가 있었습니다.
실제 WORKCRAFT에서는 URL 인수를 넘기지 않아 리디렉션이 발생하지 않았지만, 정책 점검 관점에서 불필요한 redirect 가능 코드는 제거했습니다.

### C. 숨겨진 honeypot 입력과 bot 전용 성공 응답
문의 폼에 화면에서 숨겨진 `website` 입력란이 있었고, 이 값이 채워지면 서버가 실제 메일 전송 없이 `{ ok: true }`를 반환했습니다.
이는 일반적인 스팸 방지 방식이며 Google을 구분하는 로직은 아니었지만, 자동 폼/봇 검사에서 서로 다른 응답을 만들 수 있는 요소이므로 이번 정책 정리본에서는 제거했습니다.

## 3. 이번 수정 내용

- Google Ads 기본 태그 `AW-18396552865` 유지
- 전환 라벨 `am5wCN6J1eMcEKG91MRE` 유지
- 현장진단 접수 성공 후 `gtag('event', 'conversion', ...)`를 직접 1회 호출
- redirect 가능한 `window.location` 콜백 제거
- 숨겨진 honeypot 필드와 bot 전용 fake-success 응답 제거
- WORKCRAFT를 `기업별 계약 기반 유료 맞춤 개발·구축 B2B 서비스`로 명확하게 표기
- `PC Program / Windows Program / 설치파일 / APK·AAB` 중심의 표현을 서비스 성격에 맞게 정리
- `/business`에 Service 구조화 데이터 추가
- `/business` 하단에 제공 서비스, 회사소개, 개인정보처리방침 링크 추가
- Googlebot/AdsBot/User-Agent/광고 유입 조건에 따른 페이지 분기 없음 재확인

## 4. 배포 후 반드시 확인할 항목

1. `https://bgkcogito.co.kr/business`가 일반 브라우저에서 정상 열리는지 확인
2. 현장진단 신청 1회 테스트 후 메일 수신 확인
3. Tag Assistant에서 아래 전환 1회 확인
   - `AW-18396552865/am5wCN6J1eMcEKG91MRE`
4. 광고 클릭 여부와 상관없이 `/business`의 서비스 내용·가격·절차가 동일한지 확인
5. Vercel 프로젝트에 별도 Redirect / Middleware / 보안 서비스 / 프록시 규칙이 없는지 확인
6. Google Ads 이의신청 전 실제 배포본이 이 ZIP과 동일한지 확인

## 5. 별도로 확인할 사업자 정보

소스의 `data/site.ts`에는 현재 업태/종목 참고값으로 운수·택배·도소매·전자상거래가 들어 있습니다.
Google Ads 광고주 인증에 제출한 사업자등록증의 최신 업태/종목과 홈페이지의 실제 제공 서비스 설명이 서로 모순되지 않는지 확인해 주세요.
이 값은 실제 사업자등록증을 확인하지 않고 임의 변경하면 안 되므로 이번 수정본에서는 변경하지 않았습니다.

## 결론

소스에서 의도적인 클로킹은 발견되지 않았습니다. 가장 강한 원인 후보는 정지 전에 이미 표시됐던 `무료 데스크톱 소프트웨어` 자동 분류와, 기존 페이지의 Windows/PC 배포 관련 표현이 결합되어 WORKCRAFT 서비스가 잘못 분류된 경우입니다. 여기에 정책 검토상 불필요하게 오해될 수 있는 redirect 콜백과 bot honeypot 응답도 제거했습니다.

이 버전을 실제 배포한 뒤 사이트 동작을 다시 확인하고, 그 다음 기존 Google Ads 계정에서 이의신청하는 것을 권장합니다.

## 2026-08-20 프로모션 투명성 추가
- WORKCRAFT 출시 프로모션을 `/business` 모든 방문자에게 동일하게 노출합니다.
- 광고 문구와 랜딩페이지의 혜택을 일치시키기 위해 선착순 수량, 혜택 범위, 제외 항목, 선착순 확정 기준을 공개했습니다.
- "전체 개발 무료"로 오인되지 않도록 유료 구축 계약 시 **추가 기능 1개의 BGK 개발비 100% 지원**임을 명시했습니다.
- 기본 구축비, 월 유지관리비, 제3자 비용, 표준 범위 밖 추가 요구사항, 중복 프로모션은 제외됨을 표시했습니다.
- 잔여 수량은 `data/workcraftPromotion.ts` 한 곳에서 관리하여 메인 홈페이지와 WORKCRAFT 랜딩페이지가 동일한 숫자를 사용합니다.
