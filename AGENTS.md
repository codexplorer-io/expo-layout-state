# AGENTS.md — `@codexporer.io/expo-layout-state`

## Package Overview
Layout state hook (`useLayout`) and render-prop component (`OnLayout`) guarding against unnecessary re-renders via deep equality checking on `{ x, y, width, height }`.

## Key Exports
- `useLayout(initialLayout?)`: Returns `{ currentLayout, setCurrentLayout }`.
- `OnLayout`: Component with render prop `({ layout, setLayout }) => ReactNode`.

## Critical Guidelines for AI Agents
- Use `useLayout` whenever measuring containers in complex canvas or video timeline editors to avoid render feedback loops.
- Pass `event.nativeEvent.layout` directly to `setCurrentLayout(e.nativeEvent.layout)`.
- Default values for unmeasured layouts will be `{ x: 0, y: 0, width: 0, height: 0 }`. Guard against zero width/height when calculating aspect ratios.
