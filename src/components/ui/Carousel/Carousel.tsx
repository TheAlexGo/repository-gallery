import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { JSX, MouseEvent } from 'react';

import cn from 'classnames';
import debounce from 'lodash.debounce';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@components/ui/Button/Button';
import { CarouselItem } from '@components/ui/Carousel/components/CarouselItem/CarouselItem';
import { CarouselList } from '@components/ui/Carousel/components/CarouselList/CarouselList';
import { Icon, Icons } from '@components/ui/Icon/Icon';

import classes from './Carousel.module.scss';

interface ICarousel<IItem> {
    title: string;
    items: IItem[];
    renderItem: (item: IItem, isActive: boolean) => JSX.Element;
    renderStubItem: () => JSX.Element;
}

/**
 * Индекс активного элемента
 */
const ACTIVE_ITEM_INDEX = 0;
/**
 * Крайний элемент, от которого будем делать скролл при бесконечном скролле.
 * Считаем от нуля: 0 - первый элемент, 1 - второй элемент. Нельзя ставить 0, иначе будет рекурсия скролла!
 */
const EXTREME_ITEMS_INDEX = 1;
/**
 * Количество дополнительных элементов, с помощью которых будем делать бесконечный скролл.
 * Элементы-клоны будут находиться до и после оригинального массива элементов.
 */
const CLONE_ITEMS_COUNT = 2;

export const Carousel = <IItem extends { id: string | number }>({
    title,
    items,
    renderItem,
    renderStubItem,
}: ICarousel<IItem>): JSX.Element => {
    const [activeItemIndex, setActiveItemIndex] = useState<number>(ACTIVE_ITEM_INDEX);
    const [itemWidth, setItemWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);

    const scrollRef = useRef<HTMLUListElement>(null);

    const allItemsCount = 2 * CLONE_ITEMS_COUNT + items.length;

    const id = useMemo(() => `carousel-${uuidv4()}`, []);

    const carouselClasses = cn(classes.carousel, {
        [classes['__is-dragging']]: isDragging,
    });

    const clickNextHandler = () => {
        const carousel = scrollRef.current as HTMLUListElement;
        carousel.scrollLeft += itemWidth;
    };

    const clickPrevHandler = () => {
        const carousel = scrollRef.current as HTMLUListElement;
        carousel.scrollLeft -= itemWidth;
    };

    const scrollLast = () => {
        const carousel = scrollRef.current as HTMLUListElement;
        carousel.scrollTo({
            left: carousel.scrollWidth - (2 * CLONE_ITEMS_COUNT - EXTREME_ITEMS_INDEX) * itemWidth,
            behavior: 'instant',
        });
    };

    const scrollFirst = () => {
        const carousel = scrollRef.current as HTMLUListElement;
        carousel.scrollTo({
            left: (2 * CLONE_ITEMS_COUNT - (EXTREME_ITEMS_INDEX + 1)) * itemWidth,
            behavior: 'instant',
        });
    };

    const dragStart = (e: MouseEvent) => {
        const carousel = scrollRef.current as HTMLUListElement;

        setIsDragging(true);
        setStartX(e.pageX);
        setStartScrollLeft(carousel.scrollLeft);
    };

    const dragging = (e: MouseEvent) => {
        if (!isDragging) {
            return;
        }
        const carousel = scrollRef.current as HTMLUListElement;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragEnd = (e: MouseEvent) => {
        setIsDragging(false);

        const carousel = scrollRef.current as HTMLUListElement;
        if (Math.abs(carousel.scrollLeft - startScrollLeft) > 10) {
            e.stopPropagation();
        }
    };

    const slowScrollHandler = debounce(() => {
        const carousel = scrollRef.current as HTMLUListElement;
        const currentIndex = (carousel.scrollLeft - CLONE_ITEMS_COUNT * itemWidth) / itemWidth;
        setActiveItemIndex(currentIndex);
    }, 100);

    const scrollHandler = () => {
        slowScrollHandler();
        const carousel = scrollRef.current as HTMLUListElement;

        if (carousel.scrollLeft <= EXTREME_ITEMS_INDEX * itemWidth) {
            scrollLast();
        } else if (carousel.scrollLeft >= carousel.scrollWidth - (EXTREME_ITEMS_INDEX + 1) * itemWidth) {
            scrollFirst();
        }
    };

    /**
     * Определяем размер элемента карусели и перемещаем скролл на "оригинальный" элемент
     */
    useLayoutEffect(() => {
        const carousel = scrollRef.current as HTMLUListElement;
        const currentItemWidth = carousel.scrollWidth / allItemsCount;
        setItemWidth(currentItemWidth);
        carousel.scrollTo({
            left: (CLONE_ITEMS_COUNT + ACTIVE_ITEM_INDEX) * currentItemWidth,
            behavior: 'instant',
        });
    }, [items.length, allItemsCount]);

    return (
        <section aria-labelledby={id}>
            <h1 id={id} className={classes.heading}>
                {title}
            </h1>
            <div className={classes['carousel-wrapper']}>
                <ul className={classes.controls}>
                    <li>
                        <Button className={classes['prev-item']} title="Предыдущий слайд" onClick={clickPrevHandler}>
                            <Icon icon={Icons.ARROW} isCustomSize width={16} height={30} />
                        </Button>
                    </li>
                    <li>
                        <Button className={classes['next-item']} title="Следующий слайд" onClick={clickNextHandler}>
                            <Icon icon={Icons.ARROW} isCustomSize width={16} height={30} />
                        </Button>
                    </li>
                </ul>
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <ul
                    className={carouselClasses}
                    onMouseDown={dragStart}
                    onMouseMove={dragging}
                    onMouseUpCapture={dragEnd}
                    onScroll={scrollHandler}
                    ref={scrollRef}
                >
                    {items.length > 0 && (
                        <CarouselList
                            items={items}
                            renderItem={renderItem}
                            activeItemIndex={activeItemIndex}
                            cloneItemsCount={CLONE_ITEMS_COUNT}
                        />
                    )}
                    {items.length === 0 && <CarouselItem>{renderStubItem()}</CarouselItem>}
                </ul>
                <div className="hidden" aria-live="polite" aria-atomic="true">
                    {`Слайд ${activeItemIndex + 1} из ${items.length}`}
                </div>
            </div>
        </section>
    );
};
