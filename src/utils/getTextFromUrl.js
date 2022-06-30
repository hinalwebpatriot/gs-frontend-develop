export const getTextFromUrl = (url) => {
    return url.match(/[A-Za-z0-9]+/g).reduce((pre, next) => {
        return pre + next[0].toUpperCase() + next.slice(1).toLowerCase() + ' ';
    }, '').trim();
}