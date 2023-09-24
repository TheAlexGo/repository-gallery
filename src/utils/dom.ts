/**
 * Модификатор отключения скролла для всей страницы (устанавливается на body)
 */
export const DISABLED_SCROLL_MODIFIER = '__is-overflow_hidden';

/**
 * Получает все фокусируемые элементы, внутри передаваемого элемента
 * @param {HTMLElement} element - передаваемый элемент
 * @returns {HTMLElement[]} - массив фокусируемых элементов
 */
export const getKeyboardFocusableElements = (element: HTMLElement): HTMLElement[] =>
    [
        ...element.querySelectorAll<HTMLElement>(
            'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
        ),
    ].filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
