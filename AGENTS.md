# AGENTS.md — `@codexporer.io/expo-layout-state`

## Package Overview

Layout state hook (`useLayout`) and render-prop component (`OnLayout`) guarding against unnecessary component re-renders via deep equality checking (`lodash/isEqual`) on measured coordinates and dimensions `{ x, y, width, height }`.

---

## Peer Dependencies

All peer dependencies must be installed in consuming projects (none are optional):
- `react`: `*`
- `lodash`: `*`

---

## Key Exports

- `useLayout(initialLayout?)`: Custom hook returning `{ currentLayout, setCurrentLayout }`.
  - `initialLayout`: Accepts `{ width?: number, height?: number }` (defaulting to 0; initial `x` and `y` default to 0).
  - `currentLayout`: Current measured `{ x, y, width, height }`.
  - `setCurrentLayout(layout)`: Updates state only if new `{ x, y, width, height }` differs from `currentLayout` via `lodash/isEqual`.
- `OnLayout`: Component with render prop `({ layout, setLayout }) => React.ReactNode`.

---

## Critical Guidelines for AI Agents

- **Avoid Render Thrashing**: Use `useLayout` or `OnLayout` when measuring layouts in interactive canvases, Skia views, or resizable containers to prevent render feedback loops.
- **Direct Event Passing**: Pass `event.nativeEvent.layout` directly into `setCurrentLayout(event.nativeEvent.layout)` or `setLayout(event.nativeEvent.layout)`.
- **Zero Dimension Guarding**: Unmeasured layouts default to `{ x: 0, y: 0, width: 0, height: 0 }`. Always guard against division by zero (e.g. aspect ratio math) with `if (layout.width > 0 && layout.height > 0)`.
- **Initial Coordinates**: Note that `useLayout` only accepts initial `width` and `height`; `x` and `y` are always initialized to 0.

