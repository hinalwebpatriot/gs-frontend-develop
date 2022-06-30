export default () => {
    const canonicals = document.querySelectorAll('[rel="canonical"]');
    console.log('canonicals', canonicals);
    if (canonicals.length === 2) {
        let canonicalForRemove;
        if (!canonicals[0].attributes['data-rh'] ) {
            canonicalForRemove = canonicals[0];
        }
        if (!canonicals[1].attributes['data-rh']) {
            canonicalForRemove = canonicals[1];
        }
        canonicalForRemove.remove();
    }
}