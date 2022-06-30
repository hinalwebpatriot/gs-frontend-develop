const checkForWebCache = () => {
    let hasWebCache;
    try {
        console.log('hostname', window.location.hostname);
        hasWebCache = window.location.hostname === 'webcache.googleusercontent.com';
    } catch(ex) {
        hasWebCache = false;
    }
    return hasWebCache;
};
export default checkForWebCache;