import type { FC, JSX } from 'react';
import React, { useMemo, useRef } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useFocusTrap } from '@hooks/useFocusTrap';
import { Button } from '@ui/Button/Button';
import { Icon, Icons } from '@ui/Icon/Icon';

import classes from '@ui/Modal/Modal.module.scss';

interface IModalContent {
    onClose: VoidFunction;
    renderTitle?: () => JSX.Element | null;
    renderDescription?: () => JSX.Element | null;
    renderContent?: () => JSX.Element | null;
}

export const ModalContent: FC<IModalContent> = ({
    onClose,
    renderTitle,
    renderDescription,
    renderContent,
}): JSX.Element => {
    const contentRef = useRef<HTMLDivElement>(null);
    const uuid = useMemo(() => uuidv4(), []);
    const modalId = `modal-${uuid}`;
    const modalLabelId = `modal-label-${uuid}`;
    const modalDescriptionId = `modal-description-${uuid}`;

    const renderHeadingComponent = (): JSX.Element | null => {
        if (!renderTitle) {
            return null;
        }

        return <h2 id={modalLabelId}>{renderTitle()}</h2>;
    };

    const renderDescriptionComponent = (): JSX.Element | null => {
        if (!renderDescription) {
            return null;
        }

        return <p id={modalDescriptionId}>{renderDescription()}</p>;
    };

    useFocusTrap(contentRef.current);

    return (
        <div
            id={modalId}
            className={classes.window}
            role="dialog"
            aria-labelledby={modalLabelId}
            aria-describedby={modalDescriptionId}
            aria-modal="true"
            ref={contentRef}
        >
            <Button className={classes.close} onClick={onClose} title="Закрыть окно">
                <Icon icon={Icons.CLOSE} size="100%" />
            </Button>
            <div className={classes.content} aria-live="polite" aria-atomic="true">
                {renderHeadingComponent()}
                {renderDescriptionComponent()}
                {renderContent && renderContent()}
            </div>
        </div>
    );
};
