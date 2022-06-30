export const shapeFilter = [
  "round",
  "princess",
  "emerald",
  "asscher",
  "marquise",
  "oval",
  "radiant",
  "pear",
  "heart",
  "cushion"
];
const engagementMetalFilter = [
  "platinum",
  "white-gold",
  "rose-gold",
  "yellow-gold"
];
// const productMetalFilter = [
//   "platinum",
//   "white-gold",
//   "rose-gold",
//   "yellow-gold"
// ];

const weddingMetalFilter = [
  "platinum",
  "white-gold",
  "rose-gold",
  "yellow-gold",
  "yellow-white-gold",
  "rose-white-gold"
];

const catalogMetalFilter = [
  "platinum",
  "white-gold",
  "rose-gold",
  "yellow-gold"
]

const engagementStyleFilter = [
  "vintage",
  // "3-stone",
  // "side-stone",
  "solitaire",
  "halo"
];
// const productStyleFilter = [
//   "vintage",
//   // "3-stone",
//   // "side-stone",
//   "solitaire",
//   "halo"
// ];
// const styleFilter = ['angeli', 'alta', 'cara', 'calista', 'cathedral', 'dalia', 'jana', 'rene', 'reverie', 'selena', 'snowflake', 'sol', 'tribute', 'tulip', 'vita'];

const genderFilter = ["male", "female", "womens", "mens"];
const weddingStyleFilter = ["plain", "diamonds", "modern"];
const engagementOffers = ['new'];

export function findEngagementFilterByName(slug) {
  const filterName = slug;
  const filterNameLow = slug.toLowerCase();

  if (shapeFilter.includes(filterName.toLowerCase())) {
    return {
      type: "shape",
      slug: filterNameLow
    };
  }

  if (engagementMetalFilter.includes(filterName.toLowerCase())) {
    const adaptedSlug = filterNameLow !== 'platinum' ? `18ct-${filterNameLow}` : filterNameLow;

    return {
      type: "metal",
      slug: adaptedSlug
    };
  }

  if (engagementStyleFilter.includes(filterNameLow)) {
    return {
      type: "style",
      slug: filterNameLow
    };
  }

  if (engagementOffers.includes(filterNameLow)) {
    return {
      type: 'offers',
      slug: filterNameLow
    }
  }

  if (filterNameLow === "three-stones") {
    return {
      type: "style",
      slug: "3-stone"
    };
  }

  if (filterNameLow === "side-stones") {
    return {
      type: "style",
      slug: "side-stone"
    };
  }

  if (filterNameLow === "mens") {
    return {
      type: "gender",
      slug: "mens"
    };
  }

  if (filterNameLow === "womens") {
    return {
      type: "gender",
      slug: "womens"
    };
  }

  if (filterNameLow.includes('price-under-')) {
    const matched = filterNameLow.match(/\d+/);

    if (matched) {
      return {
        type: "price-under",
        slug: [0, Number(matched[0])]
      };
    }

    return {
      type: null,
      slug: filterNameLow
    };
  }

  return {
    type: null,
    slug: filterNameLow
  };
}

export function findWeddingFilterByName(slug) {
  const filterNameLow = slug.toLowerCase();

  if (weddingStyleFilter.includes(filterNameLow)) {
    return {
      type: "style",
      slug: filterNameLow
    };
  }

  if (weddingMetalFilter.includes(filterNameLow)) {
    //sorry, it is a client demand
    const adaptedSlug = filterNameLow !== 'platinum' ? `18ct-${filterNameLow}` : filterNameLow;

    return {
      type: "metal",
      slug: adaptedSlug
    };
  }

  if (filterNameLow === "mens") {
    return {
      type: "gender",
      slug: genderFilter[0]
    };
  }

  if (filterNameLow === "womens") {
    return {
      type: "gender",
      slug: genderFilter[1]
    };
  }

  return {
    type: null,
    slug: filterNameLow
  };
}

export function findProductFilterByName(slug) {
  const filterNameLow = slug.toLowerCase();

  if (shapeFilter.includes(filterNameLow)) {
    return {
      type: "shape",
      slug: filterNameLow
    };
  }

  if (engagementMetalFilter.includes(filterNameLow)) {
    const adaptedSlug = filterNameLow !== 'platinum' ? `18ct-${filterNameLow}` : filterNameLow;

    return {
      type: "metal",
      slug: adaptedSlug
    };
  }

  if (engagementStyleFilter.includes(filterNameLow)) {
    return {
      type: "style",
      slug: filterNameLow
    };
  }

  if (filterNameLow === "three-stones") {
    return {
      type: "style",
      slug: "3-stone"
    };
  }

  if (filterNameLow === "side-stones") {
    return {
      type: "style",
      slug: "side-stone"
    };
  }

  return {
    type: null,
    slug: filterNameLow
  };
}

export function findCatalogFilterByName(slug) {
  const filterNameLow = slug.toLowerCase();

  if (filterNameLow === "mens") {
    return {
      type: "gender",
      slug: genderFilter[0]
    };
  }

  if (filterNameLow === "womens") {
    return {
      type: "gender",
      slug: genderFilter[1]
    };
  }

  if (catalogMetalFilter.includes(filterNameLow)) {
    const adaptedSlug = filterNameLow !== 'platinum' ? `18ct-${filterNameLow}` : filterNameLow;

    return {
      type: "metal",
      slug: adaptedSlug
    };
  }

  return {
    type: null,
    slug: filterNameLow
  };
}