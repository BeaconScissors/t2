---
name: t2-testing
description: How to run, test, and verify the t2 student grades Next.js application.
---

## Development Server

```bash
npm run dev
# Runs on http://localhost:3000
```

## Lint & Build

```bash
npm run lint
npx next build
```

## Key Test Data

The app renders 65 students. Two students have null GPA and all-null semester data:

| Roll Number | Name | GPA | Notes |
|---|---|---|---|
| 21261A04G4 | MOHAMMED IRFAN ALI | null | All semesters null |
| 21261A04J5 | UDAY VIGHNESHWARA KEDARNATH NAKKA | null | All semesters null |

These are useful for testing null-handling, empty states, and error boundaries.

## Testing Workflow

1. Start dev server: `npm run dev`
2. Open http://localhost:3000 in browser
3. Scroll to find null-GPA students (GPA shows "N/A")
4. Click to expand and verify empty state message appears
5. Click a normal student to verify semester tabs, subject data, and tab switching work
6. Check browser console for React warnings (should be clean)

## Architecture Notes

- Next.js 14 app router (`src/app/`)
- Student data is static in `src/lib/data.ts`
- Components: `StudentsTable` (table view), `StudentDetails` (expanded details with semester tabs)
- Error boundaries wrap both the table and individual student details
- Route-level error page at `src/app/error.tsx`
- UI components from shadcn/ui in `src/components/ui/`
