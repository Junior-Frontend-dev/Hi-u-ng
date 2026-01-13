# AGENTS.md - EffectLib Development Guide

This file provides guidelines for AI agents working on EffectLib, a React 19 + TypeScript UI/UX effects library.

## Build, Lint, and Test Commands

### Core Commands
```bash
npm run dev          # Vite dev server (port 5173)
npm run build        # Build for production, generates dist/stats.html
npm run preview      # Preview production build (port 4173)
npm run server       # Express backend (port 3001)
npx tsc --noEmit     # TypeScript type checking only
```

### Running Type Check
```bash
npx tsc --noEmit     # Required before any PR
```

### Project Structure
```
effectlib/
├── components/          # All source code (NOT src/)
│   ├── effects/         # 260+ effect components
│   ├── LazyCache.tsx    # Lazy loading & caching
│   ├── Sidebar.tsx      # Navigation
│   └── Layout.tsx       # Main layout
├── constants.ts         # Effect metadata (5000+ lines)
├── server.ts            # Express backend
├── vite.config.ts       # Vite + proxy config
└── tsconfig.json        # TypeScript config
```

## Code Style Guidelines

### Imports
```tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DemoContainer } from '../DemoContainer';
```

### Component Patterns
- **File naming**: PascalCase (`CursorFollower.tsx`)
- **Default export** for effects: `export default function EffectName()`
- **Named export** for hooks: `export function useHookName()`
- **Props interface**: `interface EffectNameProps { ... }`

### State & Refs
```tsx
// useRef for animation state (no re-renders)
const cursorRef = useRef<HTMLDivElement>(null);
const mouse = useRef({ x: 0, y: 0 });

// useState for reactive state
const [isVisible, setIsVisible] = useState(false);
```

### Animation Pattern
```tsx
useEffect(() => {
  let rafId: number;
  let isMounted = true;

  const render = () => {
    if (!isMounted) return;
    // animation logic
    rafId = requestAnimationFrame(render);
  };

  rafId = requestAnimationFrame(render);
  return () => {
 = false;
       isMounted cancelAnimationFrame(rafId);
  };
}, []);
```

### Tailwind CSS
- Use utility classes: `className="w-full h-full flex items-center justify-center bg-black"`
- Dark mode defaults: `bg-black`, `text-white`, `bg-neutral-900`
- Cursor effects: `pointer-events-none z-50 fixed`

### Event Handlers
```tsx
const onMouseMove = (e: MouseEvent) => {
  mouse.current = { x: e.clientX, y: e.clientY };
};
```

### Error Handling
```tsx
// Non-critical: console.warn
if (!ctx) {
  console.warn('EffectName: Canvas context not available');
  return;
}
```

### Lazy Loading Pattern (Required)
```tsx
// In LazyCache.tsx, add to effectComponentMap:
const effectComponentMap = {
  'effect-id': () => import('./effects/EffectName'),
};
```

### TypeScript
- Explicit types for props and interfaces
- Avoid `any` - use `unknown` or specific types
- Union types: `viewMode: 'preview' | 'prompt' | 'code'`

### Performance
- Clean up listeners in useEffect return
- Use `useCallback` for stable callbacks
- React.lazy() for all effects (code splitting)

## Backend (server.ts)
- Runs on port 3001
- Environment: `PORT`, `ADMIN_PASSWORD`, `VITE_API_URL`, `GEMINI_API_KEY`
- Admin routes: `/api/admin/*` with Bearer token auth

## Adding New Effects
1. Create `components/effects/EffectName.tsx` with default export
2. Register in `components/LazyCache.tsx` → `effectComponentMap`
3. Add metadata to `constants.ts` (id, title, description, prompt)
4. Update `components/Sidebar.tsx` category if needed

## Notes
- No ESLint/Prettier - manual formatting required
- Type check (`npx tsc --noEmit`) required before PR
- Build must succeed before PR
