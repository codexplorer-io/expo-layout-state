---
name: expo-layout-state
description: Instructions and guidelines for using @codexporer.io/expo-layout-state (Expo Layout State) in React Native and Expo applications.
---

# `@codexporer.io/expo-layout-state` Skill

## Overview
`@codexporer.io/expo-layout-state` provides equality-guarded layout measurement state management. It prevents component re-render thrashing caused by repeated `onLayout` calls reporting unchanged coordinates.

---

## When to Use
- Measuring container dimensions for canvas drawing, Skia views, or aspect-ratio bounding boxes.
- Handling window or orientation resize where geometry updates dynamically.
- Eliminating re-render loops in interactive editors.

---

## Usage Example

```tsx
import React from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';
import { useLayout } from '@codexporer.io/expo-layout-state';

export function CanvasContainer() {
  const { currentLayout, setCurrentLayout } = useLayout();

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

---

## API Reference

### `useLayout(initialLayout?: LayoutInput): UseLayoutResult`

#### Parameter
| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | `number` | `0` | Initial width |
| `height` | `number` | `0` | Initial height |
| `x` | `number` | `0` | Initial x coordinate |
| `y` | `number` | `0` | Initial y coordinate |

#### Returns
| Field | Type | Description |
| :--- | :--- | :--- |
| `currentLayout` | `{ x: number, y: number, width: number, height: number }` | Current dimensions & coordinates |
| `setCurrentLayout` | `(layout: LayoutInput) => void` | Updates state only if values differ from `currentLayout` |

### `<OnLayout />`
Render-prop component alternative to `useLayout`:

| Prop | Type | Description |
| :--- | :--- | :--- |
| `children` | `(props: { layout: LayoutState; setLayout: (l: LayoutInput) => void }) => ReactNode` | Render callback receiving layout and update setter |

---

## Critical Rules & Guidelines
1. **Initial Zero Check**: Remember that `currentLayout.width` and `height` start at 0 until `onLayout` fires. Always guard division operations (e.g. aspect ratio calculations) with `if (width > 0 && height > 0)`.
2. **Direct Event Forwarding**: Pass `event.nativeEvent.layout` directly to `setCurrentLayout`.
