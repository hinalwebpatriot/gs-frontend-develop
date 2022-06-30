import engagement from "../../src/components/_selectors/engagementProductSelectors";
import wedding from "../../src/components/_selectors/weddingProductSelectors";
import { HOSTNAME } from "../../src/config/server.config";
import get from "lodash/get";
import routing from "../../src/config/routing";
import { getMetaProductDescription } from '../../src/utils/getMetaProductDescription';

export function generateProductData({ type, state }) {
  const data =
    type === "engagement-rings"
      ? engagement.ringData(state)
      : wedding.ringData(state);

  const ring = get(data, "data.selected", {});

  if (!ring.sku) {
    return ;
  }

var arrAdditionProps = [];
if(type === "wedding-rings"){
  if(ring.options.carat_weight){
    arrAdditionProps.push({
      "@type":"propertyValue",
      name: "Carat weight",
      value: ring.options.carat_weight
    });
  };
//
if(ring.options.ring_collection.slug){
  arrAdditionProps.push({
    "@type":"propertyValue",
    name: "Collection",
    value: ring.options.ring_collection.slug
  });
};
if(ring.options.metal.slug){
  arrAdditionProps.push({
    "@type":"propertyValue",
    name: "Metal",
    value: ring.options.metal.slug
  });
};

if(ring.options.min_ring_size.slug){
  arrAdditionProps.push({
    "@type":"propertyValue",
    name: "Min ring size",
    value: ring.options.min_ring_size.slug
  });
}
if(ring.options.max_ring_size.slug){
  arrAdditionProps.push({
    "@type":"propertyValue",
    name: "Max ring size",
    value: ring.options.max_ring_size.slug
  });
}
}

if(type === "engagement-rings"){
  if(ring.options.metal.title){
    arrAdditionProps.push({
      "@type":"propertyValue",
      name: "Metal",
      value: ring.options.metal.title
    });
  }
  if (ring.options.band_width.count){
    arrAdditionProps.push({
      "@type":"propertyValue",
      name: "Band width",
      value: ring.options.band_width.count
    });
  }
  if (ring.options.stone_shape.title){
    arrAdditionProps.push(
    {
      "@type":"propertyValue",
      name: "Stone shape",
      value: ring.options.stone_shape.title
    });
  }
  if(ring.options.min_ring_size.slug && ring.options.max_ring_size.slug){
    arrAdditionProps.push({
      "@type":"propertyValue",
      name: "Available ring sizes",
      value: ring.options.min_ring_size.slug + " - " + ring.options.max_ring_size.slug
    });
  }
  if(ring.options.stone_size.count){
    arrAdditionProps.push({
      "@type":"propertyValue",
       name: "Stone size",
       value:   ring.options.stone_size.count
    });
  }
  if(ring.options.setting_type){
    arrAdditionProps.push({
      "@type":"propertyValue",
      name: "Settings type",
      value: ring.options.setting_type
    });
  }
  if(ring.options.side_setting_type){
    arrAdditionProps.push({
      "@type":"propertyValue",
  name: "Side setting type",
  value: ring.options.side_setting_type
    });
  }
  if(ring.options.ring_collection.title){
    arrAdditionProps.push({
      "@type":"propertyValue",
  name: "Collection",
  value: ring.options.ring_collection.title
    });
  }
  if(ring.options.carat_weight){
    arrAdditionProps.push({
      "@type":"propertyValue",
      name: "Approx Carat Weight",
      value: ring.options.carat_weight
    });
  }
  if(ring.options.average_ss_colour){
    arrAdditionProps.push({
      "@type":"propertyValue",
      name: "Average Side Stone Colour",
      value: ring.options.average_ss_colour
    });
  }
  
  if(ring.options.average_ss_clarity){
    arrAdditionProps.push({
      "@type":"propertyValue",
      name: "Average Side Stone Clarity",
      value: ring.options.average_ss_clarity
    });
  }
  
  if(ring.options.approx_stones){
    arrAdditionProps.push({
      "@type":"propertyValue",
      name: "Approx No. of Stones",
      value: ring.options.approx_stones
    });
  }
}


  const itemUrl = `${HOSTNAME}${
    routing({ slug: ring.h1, id: ring.id })[
      type === "engagement-rings" ? "engagementProduct" : "weddingProduct"
    ]
  }`.toLowerCase();

  const isInfinity = (type === 'wedding-rings' && (get(ring, 'options.ring_collection.slug', null) === 'infinity'));

  const template = {
    "@context": "https://schema.org/",
    "@type": "Product",
    aggregateRating: ring.reviews_count
      ? {
          "@type": "AggregateRating",
          ratingValue: ring.rate,
          reviewCount: ring.reviews_count
        }
      : undefined,
    name: `${ring.h1} ${ring.h2}`,
    description:  getMetaProductDescription({ meta: state.seo.meta, type, h1: ring.h1, h2: ring.h2 }),
    image: ring.pictures.map(item => item.origin),
    sku: ring.sku,
    url: itemUrl,
    brand: !isInfinity ? { "@type": "Thing", name: "GS Diamonds" } : undefined,
    additionalProperty: {
      "@type":"propertyValue",
      name:"Product details",
      value: arrAdditionProps
    },
    offers: {
      "@type": "Offer",
      url: itemUrl,
      priceCurrency: get(ring, "price.currency", "AUD"),
      price: get(ring, "price.count", 0),
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "GS Diamonds"
      }
    }
  };

  return `<script type="application/ld+json">${JSON.stringify(
    template,
    null,
    2
  )}</script>`;
}
