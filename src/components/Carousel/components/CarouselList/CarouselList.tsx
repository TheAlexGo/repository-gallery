import type { JSX } from 'react';
import React, { memo } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { CarouselItem } from '@components/Carousel/components/CarouselItem/CarouselItem';

interface ICarouselList<IItem> {
    items: IItem[];
    renderItem: (item: IItem) => JSX.Element;
    cloneItemsCount: number;
    activeItemIndex: number;
}

const CarouselListRaw = <IItem extends { id: string | number }>({
    items,
    renderItem,
    cloneItemsCount,
    activeItemIndex,
}: ICarouselList<IItem>): JSX.Element => {
    const renderCloneItem = (item: IItem) => (
        <CarouselItem key={uuidv4()} {...item} isClone>
            {renderItem(item)}
        </CarouselItem>
    );

    const renderCloneItems = (isLeftPart: boolean) => {
        if (items.length <= 1) {
            return null;
        }
        if (isLeftPart) {
            return items.slice(-cloneItemsCount).map(renderCloneItem);
        }
        return items.slice(0, cloneItemsCount).map(renderCloneItem);
    };
    return (
        <>
            {renderCloneItems(true)}
            {items.map((item, index) => (
                <CarouselItem key={item.id} {...item} isActive={index === activeItemIndex}>
                    {renderItem(item)}
                </CarouselItem>
            ))}
            {renderCloneItems(false)}
        </>
    );
};

export const CarouselList = memo(CarouselListRaw) as typeof CarouselListRaw;
