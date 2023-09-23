import React from 'react';
import type { FC, JSX, ButtonHTMLAttributes } from 'react';

import cn from 'classnames';

import classes from './Button.module.scss';

export enum ButtonViews {
    CLEAN = 'clean',
}

interface IButton {
    view?: ButtonViews;
}

type ButtonProps = IButton & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
    type = 'button',
    view = ButtonViews.CLEAN,
    className,
    children,
    ...props
}): JSX.Element => {
    const rootClasses = cn(
        classes.button,
        {
            [classes[`__view-${view}`]]: view !== ButtonViews.CLEAN,
        },
        className,
    );

    return (
        <button {...props} className={rootClasses} type={type}>
            {children}
        </button>
    );
};
