import { get } from 'lodash';

export function getMetaProductDescription ({ meta, type, h1, h2 }) {
    let description = get(meta, 'description', '');

    if (!description) {
        switch (type) {
            case 'engagement-rings':
                description = `The ${h1} ${h2} is made for the perfect proposal. Buy this exquisite diamond ring expertly crafted in Australia, online or in-store`;
                break;
            case 'wedding-rings':
                description = `The ${h1} ${h2} is the ultimate symbol of love, available to buy online or at our Sydney store, Australia`;
                break;
            case 'catalog':
                description = `The ${h1} ${h2} is the best catalog of jewellery in Australia` 
            default:
                description = ''
        }
    }

    return description;
}