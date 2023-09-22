import React, { type FC, type JSX } from 'react';

import { Carousel } from '@components/Carousel/Carousel';

export const App: FC = (): JSX.Element => (
    <main>
        <Carousel
            title="Топ популярных javascript репозиториев"
            items={[
                {
                    id: 1,
                    title: 'React',
                    description: 'A JavaScript library for building user interfaces.',
                    starsCount: 180809,
                    forksCount: 36747,
                },
                {
                    id: 2,
                    title: 'React123',
                    description: 'A JavaScript library for building user interfaces.',
                    starsCount: 180809,
                    forksCount: 36747,
                },
                {
                    id: 3,
                    title: 'REACTtttt',
                    description: 'A JavaScript library for building user interfaces.',
                    starsCount: 180809,
                    forksCount: 36747,
                },
                {
                    id: 4,
                    title: '4',
                    description: 'A JavaScript library for building user interfaces.',
                    starsCount: 180809,
                    forksCount: 36747,
                },
            ]}
        />
    </main>
);
