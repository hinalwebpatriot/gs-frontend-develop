import { isNull } from "lodash";
import { HOSTNAME } from "../../src/config/server.config";

const homeMark = {
  "@type": "ListItem",
  position: 1,
  name: "Home",
  item: HOSTNAME
};

const sydneyScheme = `<script type="application/ld+json"> {
  "@context" : "http://schema.org",
  "@type" : "LocalBusiness",
  "name":"GS Diamonds",
  "description": "Quality handcrafted diamond engagement rings, wedding rings, and other types of jewellery fitted with loose diamonds and precious stones at the best price in Sydney CBD Diamond jewellery store",
  "image": "https://www.gsdiamonds.com.au/static/media/logo.svg",
  "url":"https://www.gsdiamonds.com.au/",
  "email":"info@gsdiamonds.com.au",
  "telephone":"611300181294",
  "openingHours": [
  "Mo-Sa 10:00-17:30", "Tu 10:00-20:00"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "455 George Street",
    "addressLocality": "Sydney",
    "addressRegion": "NSW",
    "postalCode": "2000",
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.8721094,
    "longitude": 151.2045493
  },
  "aggregateRating":{
    "@type":"AggregateRating",
    "ratingValue":"4.8",
    "reviewCount":"746"
  },
  "priceRange":"380AUD - 1870000AUD",
  "paymentAccepted":"Visa, Master Card",
  "sameAs": [
      "https://www.instagram.com/gsdiamonds",
      "https://www.facebook.com/GSDiamonds.com.au",
      "https://www.pinterest.com.au/GSDiamondsAus",
      "https://www.youtube.com/channel/UCf7_ZUOwx6nWxyaGJ0FYDaw"
    ]
  } </script>`

const brisbaneScheme = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "GS Diamond",
  "description": "Quality handcrafted diamond engagement rings, wedding rings, and other types of jewellery fitted with loose diamonds and precious stones at the best price in Brisbane CBD Diamond jewellery store",
  "image": "https://www.gsdiamonds.com.au/static/media/logo.svg",
  "url": "https://www.gsdiamonds.com.au/brisbane/",
  "telephone": "61730538397",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "141 Queen St",
    "addressLocality": "Brisbane",
    "addressRegion": "NSW",
    "postalCode": "2000",
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 27.4696723,
    "longitude": 153.0235014
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Wednesday",
      "Friday",
      "Saturday"
    ],
    "opens": "10:00",
    "closes": "17:30"
  },{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": "Tuesday",
    "opens": "10:00",
    "closes": "20:00"
  },{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": "Sunday",
    "opens": "11:00",
    "closes": "16:30"
  }],
  "sameAs": [
    "https://www.instagram.com/gsdiamonds",
    "https://www.facebook.com/GSDiamonds.com.au",
    "https://www.pinterest.com.au/GSDiamondsAus",
    "https://www.youtube.com/channel/UCf7_ZUOwx6nWxyaGJ0FYDaw"
  ] 
}
</script>`

export function generateLocaleBusinessScript(city) {
  if (process.env.NODE_ENV === 'production') {
    if(city === 'brisbane') {
      return brisbaneScheme;
    } else {
      return sydneyScheme;
    }
  }

  return null;
}
