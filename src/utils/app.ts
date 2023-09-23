export type { JSX } from 'react';

export const isDevelopment = process.env.NODE_ENV === 'development';

export const repeat = (callback: (i: number) => JSX.Element, times = 1) => {
    const res = [];
    for (let i = 0; i < times; i++) {
        res.push(callback(i));
    }

    return res;
};
