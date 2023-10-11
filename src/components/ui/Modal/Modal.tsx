import React, { useLayoutEffect, useRef } from 'react';
import type { FC, JSX } from 'react';

import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import { ModalContent } from '@ui/Modal/components/ModalContent/ModalContent';
import { DISABLED_SCROLL_MODIFIER } from '@utils/dom';

import classes from './Modal.module.scss';

interface IModal {
    isOpen: boolean;
    onClose: VoidFunction;
    onExited?: VoidFunction;
    renderTitle?: () => JSX.Element | null;
    renderDescription?: () => JSX.Element | null;
    renderContent?: () => JSX.Element | null;
}

export const Modal: FC<IModal> = ({
    renderTitle,
    renderDescription,
    isOpen,
    onClose,
    onExited,
    renderContent,
}): JSX.Element | null => {
    const overlayRef = useRef<HTMLDivElement>(null);

    /**
     * Отключаем глобальный скролл
     */
    useLayoutEffect(() => {
        document.body.classList.add(DISABLED_SCROLL_MODIFIER);
        return () => document.body.classList.remove(DISABLED_SCROLL_MODIFIER);
    }, []);

    return createPortal(
        <CSSTransition
            in={isOpen}
            mountOnEnter
            unmountOnExit
            timeout={300}
            nodeRef={overlayRef}
            classNames={{
                enter: classes['window-enter'],
                enterActive: classes['window-enter-active'],
                exit: classes['window-exit'],
                exitActive: classes['window-exit-active'],
            }}
            onExited={onExited}
        >
            <div className={classes.overlay} ref={overlayRef}>
                <ModalContent
                    onClose={onClose}
                    renderTitle={renderTitle}
                    renderDescription={renderDescription}
                    renderContent={renderContent}
                />
            </div>
        </CSSTransition>,
        document.getElementById('modal')!,
    );
};
