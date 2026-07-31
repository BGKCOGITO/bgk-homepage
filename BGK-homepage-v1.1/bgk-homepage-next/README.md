# BGK Corporate Website

Next.js 기반 BGK 공식 홈페이지 프로젝트입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속

## Vercel 배포

1. 이 폴더 안의 파일 전체를 GitHub `bgk-homepage` 저장소에 업로드합니다.
2. Vercel에서 **Add New → Project**를 선택합니다.
3. `bgk-homepage` 저장소를 Import합니다.
4. Framework Preset은 Next.js로 자동 인식됩니다.
5. 별도 환경변수 없이 Deploy를 누릅니다.

## 주요 수정 위치

- 회사/연락처/사업자 정보: `data/site.ts`
- 홈페이지 본문: `app/page.tsx`
- 디자인: `app/globals.css`
- 이미지: `public/images`
