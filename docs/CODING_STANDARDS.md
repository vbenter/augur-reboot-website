# Augur Teaser Website - Coding Standards & Guidelines

## Overview
This document establishes unified coding standards, architectural patterns, and best practices for the Augur teaser website project to ensure consistent, maintainable, and high-quality code.

## Project Architecture

### Technology Stack
- **Astro 5.10+** - Static site generation with island architecture
- **React 19** - Interactive client-side components  
- **TypeScript** - Type-safe development with strict mode
- **Tailwind CSS 4.1** - Utility-first styling with @theme/@utility directives
- **Cloudflare Pages** - Static hosting platform

### File Organization Standards

```
src/
├── styles/global.css      # Single source of truth for all styling
├── components/            # Component organization by type
│   ├── *.astro           # Server-rendered static components
│   └── *.tsx             # Client-hydrated interactive components
├── stores/               # Nanostores state management
├── assets/               # Static SVGs and resources  
├── lib/                  # Shared utilities and helpers
├── layouts/              # Base page layouts
└── pages/                # Route definitions (file-based routing)
```

### Component Architecture Rules

#### 1. Separation of Concerns
- **Astro Components (.astro)**: Server-rendered layout and static content
- **React Components (.tsx)**: Interactive elements requiring client-side JavaScript
- **Stores**: Global state management - NO state logic in rendering components

#### 2. Naming Conventions
- **Components**: PascalCase (`HeroBanner.astro`, `TypewriterSequence.tsx`)
- **Files**: kebab-case for non-components (`animation-store.ts`, `global.css`)
- **Props**: camelCase (`animationStarted`, `numLines`)
- **CSS Classes**: kebab-case (`hero-banner-container`, `fx-glow`)

#### 3. Client Hydration Strategy
```astro
<!-- Static by default -->
<MyComponent />

<!-- Hydrate immediately on page load -->
<InteractiveButton client:load />

<!-- Hydrate when visible in viewport -->
<LazyComponent client:visible />

<!-- Client-only for complex state -->
<StatefulWidget client:only="react" />
```

## Code Quality Standards

### TypeScript Configuration
- **Strict Mode**: Always enabled (`strict: true`)
- **Type Imports**: Use explicit type imports when possible
- **Interface Definitions**: Required for all component props

```tsx
// ✅ Good
interface Props {
  title: string;
  isVisible?: boolean;
}

// ✅ Good - Type-only imports
import type { ComponentProps } from 'react';

// ❌ Avoid - Mixed imports
import React, { useState } from 'react';
```

### Component Patterns

#### React Components
```tsx
// Standard React component pattern
interface Props {
  // Props definition required
}

export default function ComponentName({ prop1, prop2 }: Props) {
  // Component logic
  return (
    <div>
      {/* JSX content */}
    </div>
  );
}
```

#### Astro Components
```astro
---
// Component script
interface Props {
  // Props definition
}

const { prop1, prop2 } = Astro.props;
---

<!-- Template content -->
<div>
  <!-- Static HTML -->
</div>

<style>
  /* Scoped styles */
</style>
```

### State Management Rules

#### 1. Store-First Approach
```ts
// ✅ Good - State in stores
// stores/animationStore.ts
import { atom } from 'nanostores';

export const animationState = atom({
  isIntroComplete: false,
  gridAnimationStarted: false
});
```

#### 2. Component Reactivity
```tsx
// ✅ Good - Pure reactive components
import { useStore } from '@nanostores/react';
import { animationState } from '../stores/animationStore';

export default function Component() {
  const state = useStore(animationState);
  
  return <div>{state.isIntroComplete ? 'Ready' : 'Loading'}</div>;
}
```

#### 3. Forbidden Patterns
```tsx
// ❌ Avoid - URL detection in components
const isHomepage = window.location.pathname === '/';

// ❌ Avoid - Direct navigation logic in render components
if (shouldRedirect) {
  window.location.href = '/other-page';
}
```

## Styling Standards

### Tailwind CSS 4 Approach
- **Single File**: All styling in `src/styles/global.css`
- **@theme Directive**: Theme customization (colors, fonts, spacing)
- **@utility Directive**: Custom utilities like `fx-glow`
- **NO Config Files**: Avoid `tailwind.config.js` - use CSS-first approach

```css
/* ✅ Good - Theme customization */
@theme {
  --color-primary: #2AE7A8;
  --font-family-mono: 'JetBrains Mono', monospace;
}

/* ✅ Good - Custom utilities */
@utility fx-glow {
  filter: drop-shadow(0 0 10px theme(colors.primary));
}
```

### Animation Standards

#### 1. CSS-First Approach
```css
/* ✅ Good - CSS keyframe animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
```

#### 2. WebGL Resource Management
```tsx
// ✅ Required - Proper dispose() implementation
useEffect(() => {
  return () => {
    // Clean up WebGL resources
    if (gl && !isDisposed) {
      dispose();
    }
  };
}, []);
```

## Security Standards

### 1. Input Sanitization
```tsx
// ✅ Good - Safe rendering
<div>{sanitizedText}</div>

// ❌ Forbidden - Dangerous HTML injection
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

### 2. Environment Variables
```ts
// ✅ Good - Type-safe env access
const apiKey = import.meta.env.PUBLIC_API_KEY;

// ❌ Avoid - Direct process access
const secret = process.env.SECRET_KEY;
```

## Performance Standards

### 1. Bundle Optimization
- Keep main bundle under 60KB gzipped
- Use dynamic imports for large components
- Implement code splitting for routes

```tsx
// ✅ Good - Lazy loading large components
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### 2. WebGL Optimization
- Implement proper vertex buffer management
- Use requestAnimationFrame for smooth animations
- Include GPU memory monitoring in development

### 3. Image Optimization
- Use Astro's built-in Image component
- Provide appropriate alt text
- Consider WebP format for better compression

## Error Handling

### 1. Error Boundaries
```tsx
// ✅ Required for WebGL components
<ErrorBoundary fallback={<StaticFallback />}>
  <WebGLComponent />
</ErrorBoundary>
```

### 2. Graceful Degradation
```tsx
// ✅ Good - Feature detection
const supportsWebGL = canvas.getContext('webgl') !== null;

return supportsWebGL ? <WebGLAnimation /> : <CSSFallback />;
```

## Testing Standards

### 1. Component Testing
```tsx
// Test component behavior, not implementation
test('displays loading state initially', () => {
  render(<Component />);
  expect(screen.getByText('Loading')).toBeInTheDocument();
});
```

### 2. Animation Testing
```tsx
// Test animation states, not timing
test('shows content after animation completes', async () => {
  render(<AnimatedComponent />);
  fireEvent(button);
  await waitFor(() => {
    expect(screen.getByText('Content')).toBeVisible();
  });
});
```

## Documentation Standards

### 1. Component Documentation
```tsx
/**
 * Interactive typewriter component with customizable speed and cursor
 * 
 * @param text - Text to animate
 * @param speed - Animation speed in milliseconds per character
 * @param showCursor - Whether to show blinking cursor
 */
interface TypewriterProps {
  text: string;
  speed?: number;
  showCursor?: boolean;
}
```

### 2. Complex Logic Documentation
```ts
// Document non-obvious business logic
/**
 * Calculates perspective matrix for 3D grid tunnel effect
 * Uses field of view and aspect ratio to create depth illusion
 */
function calculatePerspectiveMatrix(fov: number, aspect: number): Matrix4 {
  // Implementation
}
```

## Build & Deployment

### 1. Build Configuration
- **Output**: `static` for Cloudflare Pages deployment
- **No Server Adapter**: Remove unnecessary Cloudflare adapter for static sites
- **Wrangler**: Keep compatibility_date within supported range

### 2. Pre-deployment Checklist
- [ ] `npm run build` succeeds without warnings
- [ ] All TypeScript errors resolved
- [ ] Bundle sizes within acceptable limits
- [ ] All animations tested across browsers
- [ ] WebGL resources properly disposed

## Git Standards

### 1. Commit Messages
```
feat: add perspective grid tunnel animation
fix: resolve WebGL memory leak in cleanup
docs: update component documentation
refactor: simplify animation state management
```

### 2. Branch Naming
- `feature/animation-system`
- `fix/webgl-memory-leak`
- `docs/coding-standards`

## Code Review Checklist

### Before Submitting PR
- [ ] Follows naming conventions
- [ ] TypeScript strict mode compliance
- [ ] Proper error handling implemented
- [ ] Performance impact considered
- [ ] Documentation updated if needed
- [ ] No security vulnerabilities introduced

### Reviewer Focus Areas
1. **Architecture**: Separation of concerns maintained
2. **Performance**: Bundle size impact acceptable
3. **Security**: No unsafe patterns introduced
4. **Maintainability**: Code is clear and well-documented
5. **Standards**: Follows established patterns

## Maintenance Guidelines

### 1. Dependency Updates
- Update major versions during planned maintenance windows
- Test animations and WebGL components after updates
- Monitor bundle size changes

### 2. Performance Monitoring
- Monitor Core Web Vitals in production
- Track GPU memory usage for WebGL components
- Regular bundle analysis to prevent bloat

### 3. Regular Audits
- Monthly security audit with `npm audit`
- Quarterly performance review
- Semi-annual architecture review

---

## Conclusion

These standards ensure the Augur teaser website maintains high code quality, performance, and maintainability. All team members should follow these guidelines, and any deviations should be discussed and documented with clear reasoning.