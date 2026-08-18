# Google Ads 전환 추적 수정

- Google Ads 기본 태그: `AW-18396552865`
- 리드 양식 제출 전환 라벨: `am5wCN6J1eMcEKG91MRE`
- 실제 전환 send_to: `AW-18396552865/am5wCN6J1eMcEKG91MRE`
- Google Ads가 제공한 `gtag_report_conversion` 방식과 동일한 전역 함수를 `layout.tsx`에 등록했습니다.
- WORKCRAFT 현장진단 신청 API가 성공한 이후에만 해당 전환 함수를 호출합니다.
- 자체 분석 이벤트 `workcraft_field_diagnosis_submitted`는 그대로 유지됩니다.
