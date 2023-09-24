import React, { type FC, type JSX, type SVGProps } from 'react';

import type { TSvgComponent } from '@types';

import ArrowIcon from '@icons/arrow_icon.svg';
import CloseIcon from '@icons/close_icon.svg';
import ForkIcon from '@icons/fork_icon.svg';
import LinkIcon from '@icons/link_icon.svg';
import StarIcon from '@icons/star_icon.svg';

export enum Icons {
    ARROW = 'Arrow',
    STAR = 'Star',
    FORK = 'Fork',
    CLOSE = 'Close',
    LINK = 'Link',
}

const icons: Record<Icons, TSvgComponent> = {
    Arrow: ArrowIcon,
    Star: StarIcon,
    Fork: ForkIcon,
    Close: CloseIcon,
    Link: LinkIcon,
};

interface IIcon extends SVGProps<SVGSVGElement> {
    icon: Icons;
    size?: number | string;
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
