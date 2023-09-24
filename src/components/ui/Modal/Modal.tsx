import React, { useLayoutEffect, useMemo, useRef } from 'react';
import type { FC, JSX } from 'react';

import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@components/ui/Button/Button';
import { Icon, Icons } from '@components/ui/Icon/Icon';

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
    const uuid = useMemo(() => uuidv4(), []);
    const modalId = `modal-${uuid}`;
    const modalLabelId = `modal-label-${uuid}`;
    const modalDescriptionId = `modal-description-${uuid}`;

    const modalRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = 'auto';
        }
    }, [isOpen]);

    return createPortal(
        <CSSTransition
            in={isOpen}
            mountOnEnter
            unmountOnExit
            timeout={300}
            nodeRef={modalRef}
            classNames={{
                enter: classes['window-enter'],
                enterActive: classes['window-enter-active'],
                exit: classes['window-exit'],
                exitActive: classes['window-exit-active'],
            }}
            onExited={onExited}
        >
            <div className={classes.overlay} ref={modalRef}>
                <div
                    id={modalId}
                    className={classes.window}
                    role="dialog"
                    aria-labelledby={modalLabelId}
                    aria-describedby={modalDescriptionId}
                    aria-modal="true"
                >
                    <Button className={classes.close} onClick={onClose} title="Закрыть окно">
                        <Icon icon={Icons.CLOSE} size="100%" />
                    </Button>
                    <div className={classes.content}>
                        {renderTitle && <h2 id={modalLabelId}>{renderTitle()}</h2>}
                        {renderDescription && <p id={modalDescriptionId}>{renderDescription()}</p>}
                        {renderContent && renderContent()}
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('modal')!,
    );
};
