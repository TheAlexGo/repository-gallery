import React from 'react';
import type { FC, JSX } from 'react';

import { Counter } from '@components/Counter/Counter';
import { Icons } from '@components/Icon/Icon';

import type { IRepository } from '@types';

import classes from './Card.module.scss';

interface ICard extends IRepository {}

export const Card: FC<ICard> = ({ title, description, starsCount, forksCount }): JSX.Element => (
    <div className={classes.wrapper}>
        <h2 className={classes.heading}>{title}</h2>
        <p className={classes.description}>{description}</p>
        <div className={classes.footer}>
            <Counter icon={Icons.STAR} count={starsCount} />
            <Counter icon={Icons.FORK} count={forksCount} />
        </div>
    </div>
);
