import { useCallback, useEffect, useState } from 'react';

import { TAB } from '@utils/constants';
import { getKeyboardFocusableElements } from '@utils/dom';

/**
 * Замыкает табуляцию по элементам внутри элемента-контейнера (см. использование в Modal)
 * @see Modal
 */
export const useFocusTrap = (el: HTMLElement | null): void => {
    const [prevElement, setPrevElement] = useState<HTMLElement>();
    const [firstElement, setFirstElement] = useState<HTMLElement | null>(null);
    const [lastElement, setLastElement] = useState<HTMLElement | null>(null);

    const tabPressHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key !== TAB) {
                return;
            }
            const { activeElement } = document;
            if (e.shiftKey) {
                if (activeElement === firstElement) {
                    if (lastElement) {
                        lastElement.focus();
                    }
                    e.preventDefault();
                }
            } else if (activeElement === lastElement) {
                if (firstElement) {
                    firstElement.focus();
                }
                e.preventDefault();
            }
        },
        [firstElement, lastElement],
    );

    /**
     * Получаем первый и последний фокусируемые элементы
     */
    useEffect(() => {
        if (!el || firstElement || lastElement) {
            return;
        }
        const focusableElements = getKeyboardFocusableElements(el);
        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];
        setFirstElement(firstEl);
        setLastElement(lastEl);
    }, [firstElement, lastElement, el]);

    /**
     * После получения первого элемента - фокусируемся на него
     */
    useEffect(() => {
        if (firstElement) {
            firstElement.focus();
        }
    }, [firstElement]);

    /**
     * Сохраняем элемент, с которого открыли окно
     */
    useEffect(() => {
        if (prevElement || !document.activeElement) {
            return;
        }
        setPrevElement(document.activeElement as HTMLElement);
    }, [prevElement]);

    /**
     * После выхода из модального окна - возвращаемся туда, откуда открыли окно
     */
    useEffect(
        () => () => {
            if (prevElement) {
                prevElement.focus();
            }
        },
        [prevElement],
    );

    useEffect(() => {
        document.addEventListener('keydown', tabPressHandler);
        return () => document.removeEventListener('keydown', tabPressHandler);
    }, [tabPressHandler]);
};
