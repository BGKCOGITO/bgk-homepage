# BGK 홈페이지 전체 교체 안내

1. 기존 프로젝트의 `.env.local`을 별도 보관합니다.
2. 이 ZIP을 새 폴더에 압축 해제합니다. 압축을 풀면 바로 `package.json`, `app`, `components`가 보입니다.
3. 기존 `.env.local`을 새 폴더 최상단에 복사합니다.
4. 기존 Vercel 프로젝트 연결을 유지하려면 기존 프로젝트의 `.vercel` 폴더도 복사합니다.
5. 아래 명령을 실행합니다.

```powershell
npm install
npm run build
vercel --prod
```

## 기존 메일 환경변수

```env
RESEND_API_KEY=기존_Resend_API_Key
BGK_RESEND_FROM=BGK 홈페이지 <inquiry@mail.bgkcogito.co.kr>
BGK_INQUIRY_TO=bgkcogito@naver.com
```

## 확인 주소

- 메인: https://bgkcogito.co.kr
- WORKCRAFT: https://bgkcogito.co.kr/business

## 주요 확인 항목

- WORKCRAFT CORE / CONNECT / SUITE 패키지 표시
- 엑셀 관리 X / 시트 관리 X / 문서 사용 X 표시
- 재고·입출고 기본관리 및 바코드·다중창고·LOT 추적 선택 가능
- 추가 기능 선택 시 예상 견적 정상 합산
- 예상 견적 발행 후 현장진단 신청 메일 정상 수신
