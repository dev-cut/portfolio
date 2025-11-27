---
trigger: always_on
---

# ⚡ 워크플로우 및 프로세스 (Workflow & Process)

## Development Workflow

1.  **Planning**: Step-by-step plan before coding.
2.  **Verification**: `view_file` before edit, check lint/build after edit.
3.  **Safety**: Confirm before deletion/major changes.

## Git & Commits

- **Language**: **KOREAN ONLY (한글 필수)**
  - **절대 영어 금지**: 커밋 메시지의 제목과 본문 모두 **반드시 한글**로 작성해야 합니다.
  - **No English**: Commit messages MUST be written in Korean.
- **Format**: `[type]: [description]`
- **Types**:
  - `feat`: New feature
  - `fix`: Bug fix
  - `style`: Formatting (no code change)
  - `refactor`: Refactoring
  - `chore`: Build/tools
  - `docs`: Documentation
  - `design`: UI/UX changes

## Quality Control

- **Linting**: No ESLint errors.
- **Optimization**: `next/image`, `next/font`, `next/dynamic`.
- **A11y**: Semantic HTML, `alt` tags.
