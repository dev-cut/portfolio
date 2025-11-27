# Interests 섹션 레이아웃 변경

## 작업 개요

사용자의 요청에 따라 Interests 섹션의 레이아웃을 2열 구조로 변경하여 "Activities"는 왼쪽, "Language"와 "Hobbies"는 오른쪽에 배치했습니다.

## 작업 상세

- [x] `components/Interests.tsx`:
  - `leftColumn`과 `rightColumn`으로 구조 분리
  - "Language"와 "Hobbies" 섹션을 `rightColumn` 내부로 이동
- [x] `components/Interests.module.scss`:
  - 그리드 레이아웃을 2열(`0.8fr 1.2fr`)로 변경 (데스크탑 기준)
  - `leftColumn`, `rightColumn`, `sectionWrapper` 스타일 추가
  - 섹션 타이틀 폰트를 `Rammetto One`으로 변경하여 디자인 통일성 확보

## 결과

제공된 디자인 시안과 일치하도록 Activities가 좌측에, Language와 Hobbies가 우측에 수직으로 배치되는 레이아웃을 구현했습니다.
