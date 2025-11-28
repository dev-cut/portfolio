# Interests 섹션 스태거드 레이아웃 적용

## 작업 개요

사용자의 요청에 따라 Interests 섹션의 좌우 컬럼 높이를 다르게 하여(Staggered), Experience 섹션과의 겹침을 자연스럽게 처리하고 시각적 균형을 맞췄습니다.

## 작업 상세

- [x] `components/Interests.module.scss`:
  - `.interests`: 전체 상단 패딩 축소 (`5rem`)
  - `.leftColumn` (Activities): 상단 패딩 대폭 추가 (`18rem`)하여 Experience 박스 아래로 배치
  - `.rightColumn` (Language, Hobbies): 상단 패딩 없음 (`0`)으로 설정하여 Experience 박스 옆 빈 공간 활용
  - `.grid`: `align-items: flex-start` 추가하여 컬럼별 높이 독립성 보장

## 결과

Activities 섹션은 아래로 내려가고 Language 섹션은 위로 올라가는 비대칭 레이아웃이 적용되어, Experience 섹션의 돌출된 디자인과 조화를 이룹니다.
