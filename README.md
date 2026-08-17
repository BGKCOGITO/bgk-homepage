# BGK Corporate Website · WORKCRAFT

BGK 공식 홈페이지와 기업 현장진단형 맞춤 구축 서비스 `BGK WORKCRAFT` 페이지입니다.

## 주요 구성

- `/` — BGK 기업 홈페이지
- `/business` — WORKCRAFT 온라인 진단·자동 예상견적·현장진단 신청
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
