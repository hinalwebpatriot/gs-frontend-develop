import { HOSTNAME } from "../../src/config/server.config";

const homeMark = {
  "@type": "ListItem",
  position: 1,
  name: "Home",
  item: HOSTNAME
};

export function generateBreadcrumbsData(marks) {
  if (!marks || !Array.isArray(marks)) {
    return "";
  }

  const items = marks.map((item, index) => ({
    "@type": "ListItem",
    position: index + 2,
    name: item.title,
    item: HOSTNAME + item.path
  }));

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [homeMark, ...items]
  };

  return `<script type="application/ld+json">${JSON.stringify(
    breadcrumbs,
    null,
    process.env.NODE_ENV === 'production' ? 0 : 2
  )}</script>`;
}
