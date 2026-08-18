# BGK 메인 홈페이지 최종 수정

## 반영 내용
- BGK가 하는 일을 `WORKCRAFT 맞춤 구축`과 `DELIVO·PAWU 자체 제품`으로 직관적으로 구분
- 반복되던 SaaS 설명을 정리하고 각 사업의 목적과 대상 사용자를 명확하게 표현
- PAWU 보러가기: `https://pawu.bgkcogito.co.kr`
- DELIVO 보러가기: `https://delivo.bgkcogito.co.kr`
- 기존 WORKCRAFT 온라인 진단·화면 데모·자동견적 기능 유지

## 배포
기존 `.env.local`과 `.vercel`을 유지한 뒤 아래 명령을 실행합니다.

```powershell
npm install
npm run build
vercel --prod
```
