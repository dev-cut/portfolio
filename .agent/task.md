# 텍스트 선택 색상 테마 적용

## 작업 개요

사용자의 요청에 따라 텍스트 드래그 선택 시 나타나는 하이라이트 색상을 프로젝트 테마(Orange Accent)에 맞춰 수정합니다.

## 작업 상세

- [x] `app/globals.scss` 파일에 `::selection` 및 `::-moz-selection` 스타일 추가
- [x] 배경색: `var(--color-accent)` (Orange)
- [x] 텍스트색: `var(--color-text-primary)` (Dark Green)
- [x] 브라우저 테스트 및 스크린샷 검증 완료

## 결과

텍스트 선택 시 테마의 포인트 컬러인 오렌지색 배경과 짙은 녹색 텍스트가 적용되어 일관된 브랜드 경험을 제공합니다.
