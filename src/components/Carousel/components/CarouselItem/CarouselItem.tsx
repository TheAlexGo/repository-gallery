import React from 'react';
import type { AriaAttributes, FC, JSX } from 'react';

import { Icon, Icons } from '@components/Icon/Icon';

import classes from './CarouselItem.module.scss';

export interface ICarouselItem {
    id: number;
    title: string;
    description: string;
    starsCount: number;
    forksCount: number;
}

interface CarouselItemProps extends Omit<ICarouselItem, 'id'> {
    isActive?: boolean;
    isClone?: boolean;
}

export const CarouselItem: FC<CarouselItemProps> = ({
    title,
    description,
    starsCount,
    forksCount,
    isActive = false,
    isClone = false,
}): JSX.Element => {
    const ariaHiddenValue = (!isActive).toString() as AriaAttributes['aria-hidden'];

    return (
        <li className={classes.item} tabIndex={-1} aria-hidden={ariaHiddenValue} data-is-clone={isClone.toString()}>
            <h2 className={classes.heading}>{title}</h2>
            <p className={classes.description}>{description}</p>
            <div className={classes.footer}>
                <div className={classes['footer-item']}>
                    <Icon icon={Icons.STAR} />
                    <span>{starsCount}</span>
                </div>
                <div className={classes['footer-item']}>
                    <Icon icon={Icons.FORK} />
                    <span>{forksCount}</span>
                </div>
            </div>
        </li>
    );
};
