import type { FC, SVGProps } from 'react';

export type TSvgComponent = FC<SVGProps<SVGSVGElement>>;

export interface IRepository {
    id: number;
    title: string;
    author: string | null;
    description: string | null;
    link: string | null;
    tags: string[];
    starsCount: number;
    forksCount: number;
}
