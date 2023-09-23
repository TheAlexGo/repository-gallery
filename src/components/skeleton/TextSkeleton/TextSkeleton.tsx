import React from 'react';
import type { FC, JSX } from 'react';

import cn from 'classnames';

import { repeat } from '@utils/app';

import classes from './TextSkeleton.module.scss';

interface ITextSkeleton {
    className?: string;
    rowsCount: number;
}

export const TextSkeleton: FC<ITextSkeleton> = ({ className, rowsCount }): JSX.Element => {
    const rowClasses = cn(classes.row, 'skeleton-gradient', className);

    return (
        <div className={classes.text}>
            {repeat(
                (i) => (
                    <span key={i} className={rowClasses} />
                ),
                rowsCount,
            )}
        </div>
    );
};
