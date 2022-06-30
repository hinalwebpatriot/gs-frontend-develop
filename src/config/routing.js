import Cookies from "js-cookie";

const cities = ['brisbane', 'melbourne', 'perth', 'adelaide', 'canberra'];

export default (params, cityProp) => {
  let city = '';

  if (cityProp) {
    city = cities.includes(cityProp) ? `/${cityProp}` : '';
  } else {
    if (typeof window !== 'undefined') {
      const isGoogleCache = document.location.host === 'webcache.googleusercontent.com';
      const cookie = Cookies.get('gs_city', { path: '/' });
      let c = '';
      if (cookie) {
        c = cities.includes(cookie) ? `/${cookie}` : '';
      } else {
        const cityFromUrl = window.location.pathname.split('/')[1];
        c = cities.includes(cityFromUrl) ? `/${cityFromUrl}` : '';
      }
      if (isGoogleCache) {
        const hrefCity = cities.find(x => window.location.href.includes(x))
        c = hrefCity ? `/${hrefCity}` : '';
      }
      city = c;
    } else {
      city = ''
    }
  }

  return {
    root: `${city}/`,
    //main2: '/node/main',
    notFound: '/error/not-found',

    confirmEmail: `/auth/confirm/${params ? params : ':signature'}`,
    changePassword: `/auth/reset/${params ? params : ':token'}`,

    cart: '/checkout/cart',
    delivery: '/checkout/delivery',
    order: `/checkout/order/${params ? params : ':id'}`,
    servicesOrder: `/checkout/services-order/${params ? params : ':id'}`,

    cartServices: `/invoice/${params ? params : ':id'}`,
    orderServices: `/checkout/services/${params ? params : ':id'}`,

    paymentSuccess: `/checkout/success/${params ? params : ':method'}`,
    paymentFailure: `/checkout/failure/${params ? params : ':method'}`,

    landing: `/landing/${params ? params : ':slug'}`,
    diamondsFeed: `${city}/diamonds/`,
    diamondsFeedWithShape: `${city}/diamonds/${params ? params : ':shape'}`,

    SpecialDiamondsFeed: '/special-diamonds/',
    SpecialDiamondsFeedWithShape: `/special-diamonds/${params ? params : ':shape'}`,

    catalogFeed: `${city}/jewellery/${params ? params : ':catalog'}`,
    catalogFeedPagination: `${city}/jewellery/${params ? params.catalog : ':catalog'}/page-${params ? params.pageNumber : ':pageNumber'}`,
    catalogFeedWithFilter: `${city}/jewellery/${params ? params.catalog : ':catalog'}/${params ? params.filter : ':filter'}`,
    catalogFeedWithFilterPagination: `${city}/jewellery/${params ? params.catalog : ':catalog'}/${params ? params.filter : ':filter'}/page-${params ? params.pageNumber : ':pageNumber'}`,
    engagementFeed: `${city}/engagement-rings/`,
    engagementFeedPagination: `${city}/engagement-rings/page-${params ? params : ':pageNumber'}`,
    engagementFeedWithFilter: `${city}/engagement-rings/${params ? params : ':filter'}`,
    engagementFeedWithFilterPagination: `${city}/engagement-rings/${params ? params.filter : ':filter'}/page-${params ? params.pageNumber : ':pageNumber'}`,
    weddingFeed: `${city}/wedding-rings/`,
    weddingFeedPagination: `${city}/wedding-rings/page-${params ? params : ':pageNumber'}`,
    weddingFeedWithFilter: `${city}/wedding-rings/${params ? params: ':filter'}`,
    weddingFeedWithFilterPagination: `${city}/wedding-rings/${params ? params.filter : ':filter'}/page-${params ? params.pageNumber : ':pageNumber'}`,
    weddingFeedWithGenderFilter: `${city}/wedding-rings/${params ? params.gender: ':gender'}/${params ? params.style : ':style'}`,
    weddingFeedWithGenderFilterPagination: `${city}/wedding-rings/${params ? params.gender: ':gender'}/${params ? params.style : ':style'}/page-${params ? params.pageNumber : ':pageNumber'}`,
    // weddingFeedWithFilter: `/wedding-rings/${params ? generateLinkParams(params) : ':data'}`,

    diamondProduct: `/diamonds/product/${params ? linkGenerator.diamond(params): ':slug\\_:id'}`,
    SpecialDiamondProduct: `/special-diamonds/product/${params ? linkGenerator.diamond(params): ':slug\\_:id'}`,
    catalogProduct: `/${params ? linkGenerator.catalog(params) : ':slug\\_:id\\_c'}${(false && params.size) ? '?size=' + params.size : ''}`,
    engagementProduct: `/${params ? linkGenerator.engagementRing(params) : ':slug\\_:id\\_e'}${(false && params.size) ? '?size=' + params.size : ''}`,
    weddingProduct: `/${params ? linkGenerator.weddingRing(params) : ':slug\\_:id\\_w'}${(false && params.size) ? '?size=' + params.size : ''}`,

    reviews: `/reviews/`,
    catalogProductReview: `/reviews/${params ? linkGenerator.catalog(params) : ':slug\\_:id\\_c'}`,
    engagementProductReview: `/reviews/${params ? linkGenerator.engagementRing(params) : ':slug\\_:id\\_e'}`,
    weddingProductReview: `/reviews/${params ? linkGenerator.weddingRing(params) : `:slug\\_:id\\_w`}`,

    blog: `/blog/${params ? params : ''}`,
    blogTag: `/blog/tag/${params ? params : ':slug'}`,
    blogArticle: `/blog/${params ? params : ':slug'}`,

    favorite: '/favorite',
    favoriteTab: `/favorite/${params ? params : ':tab'}`,
    favoriteTabProduct: `/favorite/product-${params ? params : ':tab'}`,
    favoriteShare: `/favorite/share/${params ? params.tab : ':tab'}/${params ? params.id : ':id'}`,

    compare: '/compare',
    compareTab: `/compare/${params ? params : ':tab'}`,
    compareTabProduct: `/compare/product-${params ? params : ':tab'}`,
    compareShare: `/compare/share/${params ? params.tab : ':tab'}/${params ? params.id : ':id'}`,

    search: `/search/results${params ? `?q=${params}`: ''}`,
    // search: `/search/results${params ? searchCreateParams(params) : ''}`,
  
    completedRings: '/completed-rings/',
    referral: `/referral`,
    completedRingsShare: `/completed-rings/share/${params ? params : ':id'}`,

    /* ---Static pages ---*/
    staticPage: `/${params ? params : ':page'}`,
    faq: '/faq',
    contactUs: `/contact-us`,
    bestSellers: '/best-sellers',
    sale: '/sale',
    // googleSiteVerification: '/google-site-verification',

    jewelleryFeed: `${city}/jewellery`,

    about: '/about-us',
    newCollections: '/new-collections',
    privacyPolicy: '/privacy-policy',
    cookies: '/cookies',
    terms: '/terms-and-conditions',
    ourGuarantees: '/our-guarantees',
    highestQuality: '/highest-quality',
    moneyBack: '/30-days-money-back-and-free-shipping',
    preDeliveryShowroom: '/pre-delivery-showroom',
    guide: '/start-with-the-4cs',
    giftIdeas: '/gift-ideas',
    sitemap:'/sitemap',
    customerCare: '/customer-care',
    freeShipping: '/free-shipping',
    customJewellery: '/custom-jewellery-design',
    startWith4ct: '/start-with-the-4cs',
    helpMeChoose: '/help-me-choose',
    metalsMadeEasy: '/metals-made-easy',
    howToChooseStyle: '/how-to-choose-your-style',
    sixThingsToLook: '/blog/6-things-to-look-for-in-buying-a-diamond',
    pendantFeed: `${city}/jewellery/pendant`,
    ringsFeed: `${city}/jewellery/cluster-rings`,
    earringFeed: `${city}/jewellery/earrings`,
    braceletsFeed: `${city}/jewellery/bracelets`,
    eternityRingsFeed: `${city}/jewellery/eternity-rings`
  }
};

// function searchCreateParams(params) {
//   if (params) {
//     let newParams = new URLSearchParams(`q=${params}`);
//     console.log('!@!', newParams.get("q="), `q=${newParams}`);
//     return newParams.get("q=");
//   }
// }

export const linkGenerator = {
    diamond: (params) => `${encodeUrl(params.slug)}_${params.id}`,
    engagementRing: (params) => `${encodeUrl(params.slug)}_${params.id}_e`,
    weddingRing: (params) => `${encodeUrl(params.slug)}_${params.id}_w`,
    catalog: (params) => `${encodeUrl(params.slug)}_${params.id}_c`,
};


const encodeUrl = (str = '') => str.replace(/\s/g, '-');

export function parseLinkParams(url){
  let params = {};

  if (!url) {
    return params
  }

  url.slice(1).split('&').forEach(item => {
    const [key, value] = item.split('=');
    params[key] = value
  });

  return params;
}


// localhost:3000/auth/confirm/21?expires=1549102691&signature=5597254b4109e32703cb5a9c098880504b621fe3ea103ee3aecfb5449e0d980e
