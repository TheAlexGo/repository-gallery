import React from 'react';
import type { FC, JSX } from 'react';

import { Icon } from '@components/Icon/Icon';

import type { Icons } from '@components/Icon/Icon';

import classes from './Counter.module.scss';

interface ICounter {
    icon: Icons;
    count: number;
}

export const Counter: FC<ICounter> = ({ icon, count }): JSX.Element => (
    <div className={classes.container}>
        <Icon icon={icon} />
        <span>{count}</span>
    </div>
);
