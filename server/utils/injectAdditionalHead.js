import { generateProductData } from "./generateProductData";
import { generateCanonicalUrl } from "./generateCanonicalUrl";
import { generateGoogleTag } from "./generateGoogleTag";
import { generateNoIndexTag } from './generateNoIndexTag';

export default (req, res) => {
  res.stream.write(
    `
    ${generateCanonicalUrl(req)}
    ${generateGoogleTag()}
    ${generateNoIndexTag(req)}
    ${res.productType ? generateProductData({ type: res.productType, state: res.store.getState()}) : ""}
  `
  )
};

/* Basic usage
const html = injectHTML(htmlData, {
  html: helmet.htmlAttributes.toString(),
  title: helmet.title.toString(),
  meta: helmet.meta.toString(),
  body: routeMarkup,
  scripts: extraChunks,
  state: JSON.stringify(store.getState()).replace(/</g, '\\u003c')
});

res.send(html);
 */
