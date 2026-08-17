# BGK WORKCRAFT 현장진단 신청 메일 설정

`/business`에서 온라인 예상견적을 발행한 고객이 현장진단을 신청하면 `/api/business-inquiry`가 Resend를 통해 BGK 운영 메일로 접수 내용을 전송합니다.

## 환경변수

```env
RESEND_API_KEY=re_...
BGK_RESEND_FROM=BGK 홈페이지 <inquiry@mail.bgkcogito.co.kr>
BGK_INQUIRY_TO=bgkcogito@naver.com
```

## 접수되는 주요 항목

- 견적번호
- 회사명·업종·직원 수·현장주소
- 담당자·일정 안내 연락처·이메일
- 현재 관리 방식과 가장 불편한 업무
- 선택한 기본 구축 단계와 추가 기능
- 평균 예상견적·예상 범위·개발기간
- 구축 희망시기·희망 방문일
- 의사결정자 참석·업무자료 확인 가능 여부

## 확인 순서

```powershell
npm install
npm run build
npm run dev
```

로컬에서 `/business` 접수 테스트 후 운영 배포를 진행합니다.
