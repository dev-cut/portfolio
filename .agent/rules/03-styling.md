# 🎨 스타일링 및 디자인 (Styling & Design)

## Styling Strategy
- **SCSS Modules**: `*.module.scss` (Preferred)
- **Global Styles**: `app/globals.scss`
- **Tailwind CSS**: Only if requested (follow `tailwind.config.ts`)

## Design System
- **Single Source of Truth**: `styles/_variables.scss`
- **Usage**:
  - Must use `@use` to import variables.
  - **NO Hardcoding**: Hex codes, px values, etc. are forbidden.
  - Example: `color: $text-primary;` (✅), `color: #000;` (❌)

## UI/UX
- **Aesthetics**: Modern, Clean, Responsive.
- **Interactions**: Use micro-interactions (hover, focus, active).
- **Responsive**: Mobile-first approach.
