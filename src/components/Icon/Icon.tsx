import React, { type FC, type JSX, type SVGProps } from 'react';

import type { TSvgComponent } from '@types';

import StarIcon from '@icons/Star_icon.svg';
import ArrowIcon from '@icons/arrow_icon.svg';
import ForkIcon from '@icons/fork_icon.svg';

export enum Icons {
    ARROW = 'Arrow',
    STAR = 'Star',
    FORK = 'Fork',
}

const icons: Record<Icons, TSvgComponent> = {
    Arrow: ArrowIcon,
    Star: StarIcon,
    Fork: ForkIcon,
};

interface IIcon extends SVGProps<SVGSVGElement> {
    icon: Icons;
    size?: number;
    isCustomSize?: boolean;
}

export const Icon: FC<IIcon> = ({
    icon,
    size = 24,
    isCustomSize = false,
    width: _width,
    height: _height,
    ...props
}): JSX.Element => {
    const SvgComponent = icons[icon];

    const width = isCustomSize ? _width : size;
    const height = isCustomSize ? _height : size;

    return <SvgComponent {...props} width={width} height={height} />;
};
