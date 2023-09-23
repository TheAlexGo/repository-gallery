import type { FC, JSX, PropsWithChildren } from 'react';
import React from 'react';

import { createPortal } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@components/Button/Button';
import { Icon, Icons } from '@components/Icon/Icon';

import classes from './Modal.module.scss';

interface IModal {
    isOpen: boolean;
    onClose: VoidFunction;
    title?: JSX.Element;
    description?: JSX.Element;
}

export const Modal: FC<PropsWithChildren<IModal>> = ({
    title,
    description,
    isOpen,
    onClose,
    children,
}): JSX.Element | null => {
    const uuid = uuidv4();
    const modalId = `modal-${uuid}`;
    const modalLabelId = `modal-label-${uuid}`;
    const modalDescriptionId = `modal-description-${uuid}`;

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div className={classes.overlay}>
            <div
                id={modalId}
                className={classes.window}
                role="dialog"
                aria-labelledby={modalLabelId}
                aria-describedby={modalDescriptionId}
                aria-modal="true"
            >
                <Button className={classes.close} onClick={onClose}>
                    <Icon icon={Icons.CLOSE} />
                </Button>
                <div className={classes.content}>
                    {title && <h2 id={modalLabelId}>{title}</h2>}
                    {description && <p id={modalDescriptionId}>{description}</p>}
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('modal')!,
    );
};
