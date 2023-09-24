import { useEffect, useState } from 'react';

import type { Signal } from '@octokit/types/dist-types/Signal';

type TRequest<T> = (signal: Signal) => Promise<T>;

export const useRequest = <T>(request: TRequest<T>): Promise<T | null> => {
    const [response, setResponse] = useState<Promise<T | null>>(Promise.resolve(null));

    useEffect(() => {
        const controller = new AbortController();

        request(controller.signal)
            .then((data: T) => {
                setResponse(Promise.resolve(data));
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
    }, [request]);

    return response;
};
