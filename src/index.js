import { useState } from 'react';
import isEqual from 'lodash/isEqual';

const areLayoutsEquals = (
    {
        x,
        y,
        width,
        height
    },
    {
        x: currentX,
        y: currentY,
        width: currentWidth,
        height: currentHeight
    }
) => isEqual(
    {
        x,
        y,
        width,
        height
    },
    {
        x: currentX,
        y: currentY,
        width: currentWidth,
        height: currentHeight
    }
);

export const useLayout = ({
    width = 0,
    height = 0
} = {
    width: 0,
    height: 0
}) => {
    const [currentLayout, setCurrentLayout] = useState({
        x: 0,
        y: 0,
        width,
        height
    });

    return {
        currentLayout,
        setCurrentLayout: layout => {
            !areLayoutsEquals(layout, currentLayout) && setCurrentLayout(layout);
        }
    };
};

export const OnLayout = ({
    children
}) => {
    const [currentLayout, setCurrentLayout] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });
    return children({
        setLayout: layout => {
            !areLayoutsEquals(layout, currentLayout) && setCurrentLayout(layout);
        },
        layout: currentLayout
    });
};
