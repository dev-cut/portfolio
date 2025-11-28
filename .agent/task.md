# Interests 섹션 컬럼 너비 조정

## 작업 개요

사용자의 요청에 따라 Interests 섹션의 좌우 컬럼 너비를 동일하게(`1:1`) 조정했습니다.

## 작업 상세

- [x] `components/Interests.module.scss`:
  - `.grid`의 `grid-template-columns` 속성을 `0.8fr 1.2fr`에서 `1fr 1fr`로 변경
  - 좌우 컬럼이 동일한 너비를 가지도록 설정

## 결과

Activities 섹션(좌측)과 Language/Hobbies 섹션(우측)이 동일한 너비로 배치되어 시각적 균형이 맞춰졌습니다.
