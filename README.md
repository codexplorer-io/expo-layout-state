# `@codexporer.io/expo-layout-state`

Optimized component layout state management hook and render-prop component for React Native, preventing unnecessary re-renders via deep equality checking (`lodash/isEqual`).

## Installation & Peer Dependencies

```bash
yarn add @codexporer.io/expo-layout-state
```

Peer dependencies:
- `react` (`*`)
- `lodash` (`*`)

## Quick Start

### 1. Hook Approach (`useLayout`)

```tsx
import React from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';
import { useLayout } from '@codexporer.io/expo-layout-state';

export function ResponsiveCanvas() {
  const { currentLayout, setCurrentLayout } = useLayout({ width: 0, height: 0 });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    // Only triggers re-render if dimensions or positions actually changed!
    setCurrentLayout({ x, y, width, height });
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
import { View, Text } from 'react-native';
import { OnLayout } from '@codexporer.io/expo-layout-state';

export function HeaderWidget() {
  return (
    <OnLayout>
      {({ layout, setLayout }) => (
        <View
          onLayout={e => setLayout(e.nativeEvent.layout)}
          style={{ padding: 16 }}
        >
          <Text>Measured Height: {layout.height}px</Text>
        </View>
      )}
    </OnLayout>
  );
}
```

## API Reference

### `useLayout(initialLayout?: LayoutInput): UseLayoutResult`

#### Parameter (`initialLayout`)
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | `number` | `0` | Initial container width |
| `height` | `number` | `0` | Initial container height |
| `x` | `number` | `0` | Initial x offset |
| `y` | `number` | `0` | Initial y offset |

#### Return Value (`UseLayoutResult`)
| Property | Type | Description |
| :--- | :--- | :--- |
| `currentLayout` | `LayoutState` | Object containing measured `{ x, y, width, height }` |
| `setCurrentLayout` | `(layout: LayoutInput) => void` | Setter function that checks `lodash/isEqual` before committing state |

### `<OnLayout />`
Render prop component wrapping layout measurement state.

| Prop | Type | Description |
| :--- | :--- | :--- |
| `children` | `(props: { layout: LayoutState; setLayout: (l: LayoutInput) => void }) => ReactNode` | Render callback receiving layout and update setter |

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
```

## Why Use This?
In React Native, `onLayout` events can fire frequently during scroll, window resize, or keyboard adjustments. Passing measured bounds through standard `useState` often triggers cascading re-renders. `@codexporer.io/expo-layout-state` ensures state only updates when actual coordinate/dimension deltas occur.

## License

MIT
