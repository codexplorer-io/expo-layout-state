import React, { useState } from 'react';
import isEqual from 'lodash/isEqual';

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

const areLayoutsEquals = (
    layoutA: LayoutInput,
    layoutB: LayoutInput
): boolean => isEqual(
    {
        x: layoutA.x,
        y: layoutA.y,
        width: layoutA.width,
        height: layoutA.height
    },
    {
        x: layoutB.x,
        y: layoutB.y,
        width: layoutB.width,
        height: layoutB.height
    }
);

interface UseLayoutResult {
    currentLayout: LayoutState;
    setCurrentLayout: (layout: LayoutInput) => void;
}

export const useLayout = ({
    width = 0,
    height = 0
}: LayoutInput = {
    width: 0,
    height: 0
}): UseLayoutResult => {
    const [currentLayout, setCurrentLayout] = useState<LayoutState>({
        x: 0,
        y: 0,
        width,
        height
    });

    return {
        currentLayout,
        setCurrentLayout: (layout: LayoutInput): void => {
            if (!areLayoutsEquals(layout, currentLayout)) {
                setCurrentLayout({
                    x: layout.x ?? 0,
                    y: layout.y ?? 0,
                    width: layout.width ?? 0,
                    height: layout.height ?? 0
                });
            }
        }
    };
};

interface OnLayoutChildProps {
    setLayout: (layout: LayoutInput) => void;
    layout: LayoutState;
}

interface OnLayoutProps {
    children: (props: OnLayoutChildProps) => React.ReactNode;
}

export const OnLayout = ({
    children
}: OnLayoutProps): React.ReactNode => {
    const [currentLayout, setCurrentLayout] = useState<LayoutState>({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });
    return children({
        setLayout: (layout: LayoutInput): void => {
            if (!areLayoutsEquals(layout, currentLayout)) {
                setCurrentLayout({
                    x: layout.x ?? 0,
                    y: layout.y ?? 0,
                    width: layout.width ?? 0,
                    height: layout.height ?? 0
                });
            }
        },
        layout: currentLayout
    });
};
