import React, { useLayoutEffect, useRef, useState } from 'react';
import type { FC, JSX } from 'react';

import debounce from 'lodash.debounce';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@components/Button/Button';
import { CarouselItem } from '@components/Carousel/components/CarouselItem/CarouselItem';
import { Icon, Icons } from '@components/Icon/Icon';

import type { ICarouselItem } from '@components/Carousel/components/CarouselItem/CarouselItem';

import classes from './Carousel.module.scss';

interface ICarousel {
    title: string;
    items: ICarouselItem[];
    itemsCount?: number;
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

export const Carousel: FC<ICarousel> = ({ title, items: _items }): JSX.Element => {
    const [items] = useState<ICarouselItem[]>(_items);
    const [activeItemIndex, setActiveItemIndex] = useState<number>(ACTIVE_ITEM_INDEX);
    const [itemWidth, setItemWidth] = useState(0);

    const scrollRef = useRef<HTMLUListElement>(null);

    const allItemsCount = 2 * CLONE_ITEMS_COUNT + items.length;

    const id = `carousel-${uuidv4()}`;

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

    const slowScrollHandler = debounce(() => {
        const carousel = scrollRef.current as HTMLUListElement;
        const currentIndex = (carousel.scrollLeft - CLONE_ITEMS_COUNT * itemWidth) / itemWidth;
        setActiveItemIndex(currentIndex);
    }, 100);

    const scrollHandler = debounce(() => {
        slowScrollHandler();
        const carousel = scrollRef.current as HTMLUListElement;

        if (carousel.scrollLeft <= EXTREME_ITEMS_INDEX * itemWidth) {
            scrollLast();
        } else if (carousel.scrollLeft >= carousel.scrollWidth - (EXTREME_ITEMS_INDEX + 1) * itemWidth) {
            scrollFirst();
        }
    }, 10);

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
                <ul className={classes.carousel} onScroll={scrollHandler} ref={scrollRef}>
                    {items.slice(-CLONE_ITEMS_COUNT).map((item) => (
                        <CarouselItem key={item.id} {...item} isClone />
                    ))}
                    {items.map((item, index) => (
                        <CarouselItem key={item.id} {...item} isActive={index === activeItemIndex} />
                    ))}
                    {items.slice(0, CLONE_ITEMS_COUNT).map((item) => (
                        <CarouselItem key={item.id} {...item} isClone />
                    ))}
                </ul>
                <div className="hidden" aria-live="polite" aria-atomic="true">
                    {`Слайд ${activeItemIndex + 1} из ${items.length}`}
                </div>
            </div>
        </section>
    );
};
