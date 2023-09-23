import { useEffect } from 'react';

import type { Signal } from '@octokit/types/dist-types/Signal';

export interface IUseRequest<T> {
    request: (signal: Signal) => Promise<T>;
    callback: (item: T) => void;
}

export const useRequest = <T>({ request, callback }: IUseRequest<T>) => {
    useEffect(() => {
        const controller = new AbortController();

        request(controller.signal)
            .then((data: T) => {
                callback(data);
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    // eslint-disable-next-line no-console
                    console.log('Fetch request aborted');
                } else {
                    // eslint-disable-next-line no-console
                    console.error('Fetch request failed:', error);
                }
            });

        return () => {
            controller.abort();
        };
    }, [callback, request]);
};
