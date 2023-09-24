import React, { useEffect, useState } from 'react';
import type { FC, JSX } from 'react';

import { useDispatch } from 'react-redux';

import { setActiveRepository } from '@features/repository/slice';
import { Counter } from '@ui/Counter/Counter';
import { Icon, Icons } from '@ui/Icon/Icon';
import { Modal } from '@ui/Modal/Modal';

import type { IRepository } from '@types';

import classes from './RepositoryModal.module.scss';

interface IRepositoryModal {
    data: IRepository | null;
}

export const RepositoryModal: FC<IRepositoryModal> = ({ data }): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const modalCloseHandler = () => {
        setIsOpen(false);
    };

    const exitedHandler = () => {
        dispatch(setActiveRepository(null));
    };

    const getLinkText = () => {
        if (!data) {
            return null;
        }
        const { link } = data;
        return link?.replace('http://', '').replace('https://', '').replaceAll('/', '');
    };

    const renderTitle = () => {
        if (!data) {
            return null;
        }
        const { author, title } = data;
        return (
            <>
                {author && (
                    <div className={classes.author}>
                        <span className="hidden">Автор: </span>
                        {author}
                    </div>
                )}
                <div className={classes.title}>
                    <span className="hidden">Название: </span>
                    {title}
                </div>
            </>
        );
    };

    const renderDescription = () => {
        if (!data) {
            return null;
        }
        const { description } = data;
        return (
            <span className={classes.description}>
                <span className="hidden">Описание: </span>
                {description}
            </span>
        );
    };

    const renderContent = () => {
        if (!data) {
            return null;
        }

        const { link, tags, starsCount, forksCount } = data;
        return (
            <>
                {link && (
                    <div className={classes['link-container']}>
                        <Icon className={classes['link-icon']} icon={Icons.LINK} aria-label="Ссылка на проект" />
                        <a className={classes.link} href={link} target="_blank" rel="noreferrer">
                            {getLinkText()}
                        </a>
                    </div>
                )}
                <div>
                    <span className="hidden">Теги: </span>
                    <ul className={classes.tags}>
                        {tags.map((tag) => (
                            <li key={tag} className={classes.tag}>
                                {tag}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={classes.achievements}>
                    <Counter icon={Icons.STAR} count={starsCount} title="Количество звёзд" />
                    <Counter icon={Icons.FORK} count={forksCount} title="Количество форков" />
                </div>
            </>
        );
    };

    useEffect(() => {
        setIsOpen(data !== null);
    }, [data]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={modalCloseHandler}
            onExited={exitedHandler}
            renderTitle={renderTitle}
            renderDescription={renderDescription}
            renderContent={renderContent}
        />
    );
};
