import React from 'react';
import type { FC, JSX } from 'react';

import { useDispatch } from 'react-redux';

import { Counter } from '@components/ui/Counter/Counter';
import { Icon, Icons } from '@components/ui/Icon/Icon';
import { Modal } from '@components/ui/Modal/Modal';
import { setActiveRepository } from '@features/repository/slice';

import type { IRepository } from '@types';

import classes from './RepositoryModal.module.scss';

interface IRepositoryModal {
    data: IRepository;
}

export const RepositoryModal: FC<IRepositoryModal> = ({ data }): JSX.Element => {
    const { author, title, description, link, tags, starsCount, forksCount } = data;

    const dispatch = useDispatch();

    const modalCloseHandler = () => {
        dispatch(setActiveRepository(null));
    };

    const renderTitle = () => (
        <>
            {author && <div className={classes.author}>{author}</div>}
            <div className={classes.title}>{title}</div>
        </>
    );

    const renderDescription = () => <span className={classes.description}>{description}</span>;

    return (
        <Modal isOpen onClose={modalCloseHandler} title={renderTitle()} description={renderDescription()}>
            {link && (
                <div className={classes['link-container']}>
                    <Icon className={classes['link-icon']} icon={Icons.LINK} />
                    <a className={classes.link} href={link}>
                        {link.replace('https://', '')}
                    </a>
                </div>
            )}
            <ul className={classes.tags}>
                {tags.map((tag) => (
                    <li key={tag} className={classes.tag}>
                        {tag}
                    </li>
                ))}
            </ul>
            <div className={classes.achievements}>
                <Counter icon={Icons.STAR} count={starsCount} />
                <Counter icon={Icons.FORK} count={forksCount} />
            </div>
        </Modal>
    );
};
