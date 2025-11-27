# Experience 섹션 오버랩 레이아웃 적용

## 작업 개요

사용자의 요청에 따라 "Experience" 섹션(오렌지 박스)이 하단 섹션("Interests")을 덮는 형태의 오버랩 레이아웃을 구현했습니다.

## 작업 상세

- [x] `components/ResumeGrid.module.scss`:
  - `.resumeGrid`: 하단 패딩 제거 (`padding-bottom: 0`)
  - `.experienceSection`: 음수 마진 적용 (`margin-bottom: -6rem`), `z-index` 상향 조정, 그림자 효과 추가
- [x] `components/Interests.module.scss`:
  - `.interests`: 상단 패딩 증가 (`padding-top: 8rem`)하여 오버랩된 영역만큼 콘텐츠 공간 확보

## 결과

Experience 섹션이 자연스럽게 다음 섹션으로 이어지며 입체적인 레이아웃이 완성되었습니다.
