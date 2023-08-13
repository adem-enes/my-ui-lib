export const getBackground = () => {
    const html = document.getElementsByTagName("html")[0];
    // const body = document.getElementsByTagName("body")[0];

    const style = window.getComputedStyle(html);

    return style.backgroundColor || style.background;
}