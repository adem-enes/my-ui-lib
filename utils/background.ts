export const getBackground = () => {
    const html = document.getElementsByTagName("html")[0];
    // const body = document.getElementsByTagName("body")[0];

    const style = window.getComputedStyle(html);

    return style.backgroundColor || style.background;
}

export const findClosestBackground = (element: HTMLElement | null): string => {
    const isValidColor = (color: string): boolean => {
        return !!color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent";
    };

    let currentElement: Node | null = element;

    while (currentElement && currentElement !== document) {
        if (currentElement instanceof HTMLElement) {
            const style = window.getComputedStyle(currentElement);
            const backgroundColor = style.backgroundColor || style.background;

            if (isValidColor(backgroundColor)) {
                return backgroundColor;
            }
        }
        currentElement = currentElement.parentElement;
    }

    return "white"; // Default color
};