# `@codexporer.io/expo-layout-state`

Optimized layout state management hook and render-prop component for React and React Native, preventing unnecessary re-renders via deep equality checking (`lodash/isEqual`) on `{ x, y, width, height }`.

---

## Peer Dependencies

All peer dependencies are required and must be installed in consuming projects (none are optional):
- `react`: `*`
- `lodash`: `*`

---

## Installation

```bash
yarn add @codexporer.io/expo-layout-state
```

---

## Quick Start

### 1. Hook Approach (`useLayout`)

```tsx
import React from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';
import { useLayout } from '@codexporer.io/expo-layout-state';

export function ResponsiveCanvas() {
  const { currentLayout, setCurrentLayout } = useLayout({ width: 0, height: 0 });

  const handleLayout = (event: LayoutChangeEvent) => {
    // Only triggers re-render if coordinates or dimensions actually changed!
    setCurrentLayout(event.nativeEvent.layout);
  };

  return (
    <View onLayout={handleLayout} style={{ flex: 1 }}>
      <Text>Dimensions: {currentLayout.width} x {currentLayout.height}</Text>
    </View>
  );
}
```

### 2. Render Props Approach (`<OnLayout />`)

```tsx
import React from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';
import { OnLayout } from '@codexporer.io/expo-layout-state';

export function HeaderWidget() {
  return (
    <OnLayout>
      {({ layout, setLayout }) => (
        <View
          onLayout={(e: LayoutChangeEvent) => setLayout(e.nativeEvent.layout)}
          style={{ padding: 16 }}
        >
          <Text>Measured Height: {layout.height}px</Text>
        </View>
      )}
    </OnLayout>
  );
}
```

---

## API Reference

### `useLayout(initialLayout?: LayoutInput): UseLayoutResult`

Custom React hook that manages component layout state, guarding state updates with deep equality comparisons.

#### Parameter (`initialLayout`)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | `number` | `0` | Initial layout width (initial `x` and `y` default to `0`) |
| `height` | `number` | `0` | Initial layout height (initial `x` and `y` default to `0`) |

#### Return Value (`UseLayoutResult`)

| Property | Type | Description |
| :--- | :--- | :--- |
| `currentLayout` | `LayoutState` | Object containing current `{ x, y, width, height }` |
| `setCurrentLayout` | `(layout: LayoutInput) => void` | Updates state only if `{ x, y, width, height }` differs from `currentLayout` via `lodash/isEqual` |

---

### `<OnLayout />`

Render-prop component wrapping layout state.

#### Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `children` | `(props: { layout: LayoutState; setLayout: (layout: LayoutInput) => void }) => React.ReactNode` | Render callback receiving measured `layout` and `setLayout` updater |

---

## Data Types

```ts
interface LayoutState {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LayoutInput {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

interface UseLayoutResult {
  currentLayout: LayoutState;
  setCurrentLayout: (layout: LayoutInput) => void;
}
```

---

## Equality Comparison Logic

Before updating state, `useLayout` and `OnLayout` compare the incoming `LayoutInput` against `currentLayout` using `lodash/isEqual`:

```ts
const areLayoutsEquals = (layoutA: LayoutInput, layoutB: LayoutInput): boolean =>
  isEqual(
    { x: layoutA.x, y: layoutA.y, width: layoutA.width, height: layoutA.height },
    { x: layoutB.x, y: layoutB.y, width: layoutB.width, height: layoutB.height }
  );
```

When changes are detected, missing input properties default to `0` (`x ?? 0`, `y ?? 0`, `width ?? 0`, `height ?? 0`).

---

## License

MIT

