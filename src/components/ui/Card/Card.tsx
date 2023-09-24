import React from 'react';
import type { FC, JSX } from 'react';

import { Counter } from '@ui/Counter/Counter';
import { Icons } from '@ui/Icon/Icon';

import type { IRepository } from '@types';

import classes from './Card.module.scss';

interface ICard extends IRepository {}

export const Card: FC<ICard> = ({ title, description, starsCount, forksCount }): JSX.Element => (
    <article className={classes.wrapper}>
        <div className={classes.content}>
            <h2 className={classes.heading}>{title}</h2>
            <p className={classes.description}>{description}</p>
            <div className={classes.footer}>
                <Counter icon={Icons.STAR} count={starsCount} title="Количество звёзд" />
                <Counter icon={Icons.FORK} count={forksCount} title="Количество форков" />
            </div>
        </div>
    </article>
);
