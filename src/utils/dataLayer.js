export const dataLayerPush = (obj) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(obj)
}