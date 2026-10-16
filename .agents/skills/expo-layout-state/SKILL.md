---
name: expo-layout-state
description: Instructions and guidelines for using @codexporer.io/expo-layout-state (Expo Layout State) in React Native and Expo applications.
---

# `@codexporer.io/expo-layout-state` Skill

## Overview
`@codexporer.io/expo-layout-state` provides equality-guarded layout measurement state management. It prevents component re-render thrashing caused by repeated `onLayout` calls reporting unchanged coordinates using `lodash/isEqual`.

---

## Peer Dependencies

All peer dependencies are required and must be installed in consuming projects (none are optional):
- `react`: `*`
- `lodash`: `*`

---

## When to Use
- Measuring container dimensions for canvas drawing, Skia views, or aspect-ratio bounding boxes.
- Handling window or orientation resize where geometry updates dynamically.
- Eliminating re-render loops in interactive editors.

---

## Usage Example

### 1. Hook Pattern (`useLayout`)

```tsx
import React from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';
import { useLayout } from '@codexporer.io/expo-layout-state';

export function CanvasContainer() {
  const { currentLayout, setCurrentLayout } = useLayout({ width: 0, height: 0 });

  const handleLayout = (event: LayoutChangeEvent) => {
    setCurrentLayout(event.nativeEvent.layout);
  };

  return (
    <View onLayout={handleLayout} style={{ flex: 1 }}>
      {currentLayout.width > 0 && (
        <Text>Measured width: {currentLayout.width}px</Text>
      )}
    </View>
  );
}
```

### 2. Render-Prop Pattern (`<OnLayout />`)

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

#### Parameter (`initialLayout`)
| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | `number` | `0` | Initial width (initial `x` and `y` default to `0`) |
| `height` | `number` | `0` | Initial height (initial `x` and `y` default to `0`) |

#### Returns (`UseLayoutResult`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `currentLayout` | `{ x: number, y: number, width: number, height: number }` | Current dimensions & coordinates |
| `setCurrentLayout` | `(layout: LayoutInput) => void` | Updates state only if `{ x, y, width, height }` differs from `currentLayout` via `lodash/isEqual` |

### `<OnLayout />`
Render-prop component alternative to `useLayout`:

| Prop | Type | Description |
| :--- | :--- | :--- |
| `children` | `(props: { layout: LayoutState; setLayout: (l: LayoutInput) => void }) => React.ReactNode` | Render callback receiving layout and update setter |

---

## Critical Rules & Guidelines
1. **Initial Zero Check**: `currentLayout.width` and `height` start at 0 until `onLayout` fires. Always guard division operations (e.g. aspect ratio calculations) with `if (width > 0 && height > 0)`.
2. **Direct Event Forwarding**: Pass `event.nativeEvent.layout` directly to `setCurrentLayout` or `setLayout`.
3. **All Peer Dependencies Required**: Consuming projects must install both `react` and `lodash` without marking any as optional.

