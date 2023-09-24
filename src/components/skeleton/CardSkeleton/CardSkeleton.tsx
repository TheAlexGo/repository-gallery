import React from 'react';
import type { FC, JSX } from 'react';

import { TextSkeleton } from '@components/skeleton/TextSkeleton/TextSkeleton';
import { Counter } from '@components/ui/Counter/Counter';
import { Icons } from '@components/ui/Icon/Icon';

import classes from './CardSkeleton.module.scss';
import cardClasses from '@components/ui/Card/Card.module.scss';

interface ICardSkeleton {}

export const CardSkeleton: FC<ICardSkeleton> = (): JSX.Element => (
    <article className={cardClasses.wrapper}>
        <div className={cardClasses.content}>
            <TextSkeleton className={classes.heading} rowsCount={1} />
            <TextSkeleton className={classes.description} rowsCount={3} />
            <div className={classes.footer}>
                <Counter icon={Icons.STAR} />
                <Counter icon={Icons.FORK} />
            </div>
        </div>
    </article>
);
