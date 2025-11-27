---
description: 프로젝트 규칙 검사 (Next.js, TypeScript, SCSS, 한글 커밋)
---

# 프로젝트 규칙 검사

이 워크플로우는 코드가 `.agent/rules/`에 정의된 프로젝트의 엄격한 규칙을 준수하는지 확인합니다.

## 단계

1.  **코드 구조 검토**
    - `tech-stack.md` (파일 구조) 준수 여부 확인.

2.  **컴포넌트 아키텍처 확인**
    - `tech-stack.md` (컴포넌트, 코딩 표준) 준수 여부 확인.

3.  **스타일링 확인**
    - `styling.md` 준수 여부 확인.
    - **중요**: `styles/_variables.scss` 사용 확인 (하드코딩된 값 금지).

4.  **TypeScript 유효성 검사**
    - `tech-stack.md` (TypeScript) 준수 여부 확인.

5.  **성능 및 접근성 (A11y)**
    - `tech-stack.md` (성능) 준수 여부 확인.
    - `process.md` (품질 관리) 준수 여부 확인.

6.  **커밋 메시지 확인**
    - `process.md` (Git & Commits) 준수 여부 확인.
    - **중요**: 커밋 메시지가 **한글**인지 확인.

7.  **언어 규칙 확인**
    - `language.md` 준수 여부 확인 (모든 문서 한글 작성).

## 참조

- `.agent/rules/persona.md`
- `.agent/rules/tech-stack.md`
- `.agent/rules/styling.md`
- `.agent/rules/process.md`
- `.agent/rules/language.md`
