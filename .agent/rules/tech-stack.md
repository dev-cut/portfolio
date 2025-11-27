---
trigger: always_on
---

# 🛠 기술 스택 (Tech Stack)

## Core

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Library**: React 19+

## File Structure

- `app/`: Routing & Layouts (App Router)
- `app/actions/`: Server Actions (`'use server'`)
- `components/`: Reusable Components (PascalCase)
- `lib/`: Utilities & Helpers (camelCase)
- `styles/`: Global Styles & Variables
- `types/`: Shared Types

## Coding Standards

- **TypeScript**:
  - `any` 사용 금지.
  - Interface 우선 사용.
  - Props 타입 명시 필수.
- **Components**:
  - **Server Components** 기본 사용.
  - **Client Components** (`'use client'`)는 상호작용 필요 시에만.

## Data Fetching

- **Server Components**: Use `fetch`, `async/await`.
- **Caching**:
  - `cache: 'force-cache'` (Default/SSG)
  - `cache: 'no-store'` (SSR)
  - `next: { revalidate: 3600 }` (ISR)
- **Mutations**: Use Server Actions in `app/actions/`.

## Performance

- **Images (`next/image`)**:
  - `width`, `height`, `alt` 필수.
  - `priority`: Above-the-fold 이미지에 사용.
  - `placeholder="blur"`, `sizes` 활용.
- **Fonts (`next/font`)**:
  - `display: 'swap'`, `variable` 사용.
- **Bundling**: `next/dynamic` for heavy components.
