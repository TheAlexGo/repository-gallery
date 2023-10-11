import React from 'react';
import type { AriaAttributes, FC, JSX, PropsWithChildren } from 'react';

import classes from './CarouselItem.module.scss';

interface CarouselItemProps {
    isActive?: boolean;
    isClone?: boolean;
}

export const CarouselItem: FC<PropsWithChildren<CarouselItemProps>> = ({
    isActive = false,
    isClone = false,
    children,
}): JSX.Element => {
    const ariaHiddenValue = (!isActive).toString() as AriaAttributes['aria-hidden'];

    return (
        <li className={classes.item} aria-hidden={ariaHiddenValue} data-is-clone={isClone.toString()}>
            {children}
        </li>
    );
};
