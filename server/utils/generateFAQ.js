import { seoTextBlockSelector } from "../../src/components/_selectors/metaTagsSelectors";
import createMetaSlug from "../../src/utils/createMetaSlug";

export function generateFAQ(req, state) {
  const urls = req.path.split('/');
  const metaSlug = createMetaSlug(
    urls[1],
    urls[2]
  );
  const data = seoTextBlockSelector(state, metaSlug)
  const collapses = data && data.collapses;
  
  if (!collapses || collapses.length === 0) return '';
  
  const template = {
    "@context": "https://schema.org/",
    "@type": "FAQPage",
    "mainEntity": collapses.map((item) => ({
      "@type": "Question",
      "name": item.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.content
      }
    }))
  };

  return `<script type="application/ld+json">${JSON.stringify(
    template,
    null,
    2
  )}</script>`;
}
