---
description: Check code against project rules (Next.js, TypeScript, SCSS, Korean Commits)
---

# Check Project Rules

This workflow verifies that the code follows the project's strict rules defined in `.agent/rules/`.

## Steps

1.  **Review Code Structure**
    - Check compliance with `02-tech-stack.md` (File Structure).

2.  **Verify Component Architecture**
    - Check compliance with `02-tech-stack.md` (Components, Coding Standards).

3.  **Check Styling**
    - Check compliance with `03-styling.md`.
    - **CRITICAL**: Verify `styles/_variables.scss` usage (No hardcoded values).

4.  **Validate TypeScript**
    - Check compliance with `02-tech-stack.md` (TypeScript).

5.  **Performance & A11y**
    - Check compliance with `02-tech-stack.md` (Performance).
    - Check compliance with `04-process.md` (Quality Control).

6.  **Commit Message Check**
    - Check compliance with `04-process.md` (Git & Commits).
    - **CRITICAL**: Ensure commit messages are in **KOREAN**.

## Reference
- `.agent/rules/01-persona.md`
- `.agent/rules/02-tech-stack.md`
- `.agent/rules/03-styling.md`
- `.agent/rules/04-process.md`
