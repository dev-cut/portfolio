---
description: Generate a commit message following project rules (Korean)
---

# Generate Commit Message

This workflow generates a commit message that adheres to the project's strict Korean-only policy.

## Steps

1.  **Analyze Changes**
    - Review `git diff` or staged changes.

2.  **Draft Message**
    - **LANGUAGE**: Korean (Hangul) ONLY.
    - **Format & Types**: Follow `04-process.md` (Git & Commits).

3.  **Verify**
    - Ensure NO English is used in the description.
    - Example: `feat: 로그인 페이지 레이아웃 개선` (Good)

4.  **Output**
    - Present the commit message to the user.
