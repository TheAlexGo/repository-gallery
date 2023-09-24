import React, { type FC, type JSX, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { CardSkeleton } from '@components/skeleton/CardSkeleton/CardSkeleton';
import { RepositoryModal } from '@features/repository/RepositoryModal/RepositoryModal';
import { activeRepositorySelector, repositoryListSelector } from '@features/repository/selectors';
import { init, setActiveRepository } from '@features/repository/slice';
import { Button } from '@ui/Button/Button';
import { Card } from '@ui/Card/Card';
import { Carousel } from '@ui/Carousel/Carousel';
import { getRepositories } from '@utils/api';

import type { IRepository } from '@types';

import { useRequest } from '../../hooks/useRequest';

import type { Signal } from '@octokit/types/dist-types/Signal';

import classes from './App.module.scss';

export const App: FC = (): JSX.Element => {
    const repositories = useSelector(repositoryListSelector);
    const activeRepository = useSelector(activeRepositorySelector);

    const dispatch = useDispatch();

    const itemClickHandler = (item: IRepository) => {
        dispatch(setActiveRepository(item));
    };

    const renderCarouselItem = (item: IRepository, isActive: boolean) => {
        const clickHandler = () => {
            itemClickHandler(item);
        };
        return (
            <Button
                className={classes.card}
                onClick={clickHandler}
                tabIndex={isActive ? 0 : -1}
                title={`Узнать больше о ${item.title}?`}
            >
                <Card {...item} />
            </Button>
        );
    };

    const renderCarouselStubItem = () => <CardSkeleton />;

    const request = useCallback((signal: Signal) => getRepositories(signal), []);

    useRequest<IRepository[]>(request).then((list) => {
        if (list) {
            dispatch(init(list));
        }
    });

    return (
        <main>
            <Carousel<IRepository>
                className={classes.carousel}
                headingClassName={classes['carousel-heading']}
                carouselWrapperClassName={classes['carousel-wrapper']}
                title="Топ популярных javascript репозиториев"
                items={repositories}
                renderItem={renderCarouselItem}
                renderStubItem={renderCarouselStubItem}
            />
            <RepositoryModal data={activeRepository} />
        </main>
    );
};
