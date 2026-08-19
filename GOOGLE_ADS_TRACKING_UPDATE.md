# Google Ads 전환 추적 및 정책 안전 정리

- Google Ads 기본 태그: `AW-18396552865`
- 리드 양식 제출 전환 라벨: `am5wCN6J1eMcEKG91MRE`
- 실제 전환 `send_to`: `AW-18396552865/am5wCN6J1eMcEKG91MRE`
- `layout.tsx`에는 Google Ads 기본 태그만 등록합니다.
- WORKCRAFT 현장진단 신청 API가 성공한 이후 `gtag('event', 'conversion', ...)`를 직접 1회 호출합니다.
- 사용하지 않던 `window.location` redirect 콜백은 제거했습니다.
- 자체 분석 이벤트 `workcraft_field_diagnosis_submitted`는 유지합니다.
- 숨겨진 honeypot 입력과 bot 전용 fake-success 응답은 제거했습니다.
