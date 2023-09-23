import React from 'react';
import type { FC, JSX } from 'react';

import { TextSkeleton } from '@components/skeleton/TextSkeleton/TextSkeleton';
import { Icon } from '@components/ui/Icon/Icon';

import type { Icons } from '@components/ui/Icon/Icon';

import classes from './Counter.module.scss';

interface ICounter {
    icon: Icons;
    count?: number;
}

export const Counter: FC<ICounter> = ({ icon, count }): JSX.Element => {
    const renderCount = () => {
        if (!count) {
            return <TextSkeleton rowsCount={1} />;
        }
        return <div className={classes.counter}>{count}</div>;
    };

    return (
        <div className={classes.container}>
            <Icon className={classes.icon} icon={icon} />
            {renderCount()}
        </div>
    );
};
