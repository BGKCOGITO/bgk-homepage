# BGK 홈페이지 상담 문의 - Resend 설정

이 버전은 네이버 SMTP를 사용하지 않고 Resend Email API로 문의 메일을 전송합니다.

## 1. Resend 가입 및 API Key 생성

1. https://resend.com 에 가입합니다.
2. API Keys 메뉴에서 새 API Key를 생성합니다.
3. 생성된 Key는 한 번만 표시될 수 있으므로 안전하게 보관합니다.

## 2. 발신 도메인 인증

실제 `bgkcogito@naver.com`으로 상담 메일을 보내려면 Resend에서 소유 도메인을 인증해야 합니다.

추천: 홈페이지 루트 도메인과 분리한 발신 서브도메인 사용

- `mail.bgkcogito.co.kr`

Resend > Domains > Add Domain 에서 `mail.bgkcogito.co.kr`을 추가한 뒤,
Resend가 안내하는 DNS 레코드를 현재 `bgkcogito.co.kr` DNS 관리 화면에 추가하고 Verified 상태가 될 때까지 기다립니다.

인증 후 발신 주소는 실제 사서함이 없어도 사용할 수 있습니다.

예:

`BGK 홈페이지 <inquiry@mail.bgkcogito.co.kr>`

## 3. .env.local

프로젝트 최상단 `.env.local`에 아래 내용을 추가합니다.

```env
RESEND_API_KEY=re_발급받은_API_KEY
BGK_RESEND_FROM=BGK 홈페이지 <inquiry@mail.bgkcogito.co.kr>
BGK_INQUIRY_TO=bgkcogito@naver.com
```

API Key는 절대로 GitHub에 업로드하지 마세요.

## 4. 로컬 테스트

```powershell
npm install
npm run dev
```

`/business` 페이지에서 문의폼을 전송한 뒤 `bgkcogito@naver.com` 수신 여부를 확인합니다.

## 5. Vercel 배포

Vercel 프로젝트 > Settings > Environment Variables 에 아래 3개를 등록합니다.

- `RESEND_API_KEY`
- `BGK_RESEND_FROM`
- `BGK_INQUIRY_TO`

Production / Preview / Development 중 필요한 환경에 적용한 뒤 재배포합니다.

## 테스트 도메인 주의

`onboarding@resend.dev`는 개발용입니다. 기본 테스트 도메인은 Resend 계정 소유자의 이메일 주소로만 실제 테스트 발송할 수 있습니다. 운영 문의를 `bgkcogito@naver.com`으로 받으려면 BGK 소유 도메인을 Resend에서 인증하고 `BGK_RESEND_FROM`을 해당 도메인 주소로 설정하세요.
