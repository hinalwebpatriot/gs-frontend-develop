import axios from 'axios';
import qs from 'qs';

// axios.create({
//   baseURL: "http://gsd.envertis.solutions/",
//   timeout: 90000
// });
axios.defaults.baseURL = 'https://gsd.envertis.solutions/';
const createApiRouting = (axiosInstance) => ({
  config: {
    getLocales: () => axiosInstance.get('/api/settings/locales'),
    getCurrencies: () => axiosInstance.get('/api/settings/currencies'),
    getLocations: () => axiosInstance.get('/api/settings/locations'),
    getSettings: () => axiosInstance.get('/api/settings/locations-data'),
    submitSettings: (data) => axiosInstance.post('/api/settings/select-locations', data),
    getMainMenu: () => axiosInstance.get('/api/menu-dropdown'),
    acceptCookie: () => axiosInstance.post('/express/api/accept-cookie')
  },
  search: {
    quickResults: (query) => axiosInstance.get(`/api/search/preview?q=${query}`),
    getCount: (query) => axiosInstance.get(`/api/search?q=${query}`),
    getBlog: ({query, page = 1, perPage = 10}) => axiosInstance.get(`/api/search/detail/blog?q=${query}&page=${page}&per_page=${perPage}`),
    getDiamond: ({query, page = 1, perPage = 10}) => axiosInstance.get(`/api/search/detail/diamond?q=${query}&page=${page}&per_page=${perPage}`),
    getEngagement: ({query, page = 1, perPage = 10}) => axiosInstance.get(`/api/search/detail/engagement?q=${query}&page=${page}&per_page=${perPage}`),
    getWedding: ({query, page = 1, perPage = 10}) => axiosInstance.get(`/api/search/detail/wedding?q=${query}&page=${page}&per_page=${perPage}`),
    getPendant: ({query, page = 1, perPage = 10}) => axiosInstance.get(`/api/search/detail/pendant?q=${query}&page=${page}&per_page=${perPage}`),
    getEarrings: ({query, page = 1, perPage = 10}) => axiosInstance.get(`/api/search/detail/earrings?q=${query}&page=${page}&per_page=${perPage}`),
    getBracelets: ({query, page = 1, perPage = 10}) => axiosInstance.get(`/api/search/detail/bracelets?q=${query}&page=${page}&per_page=${perPage}`),
  },
  cart: {
    getInvoice: (id) => axiosInstance.get(`/api/invoice/${id}`),

    getCart: () => axiosInstance.get('/api/cart/get'),
    addDiamond: (data) => axiosInstance.post('/api/cart/add/diamonds', data),
    addEngagement: (data) => axiosInstance.post('/api/cart/add/engagement-rings', data),
    addWedding: (data) => axiosInstance.post('/api/cart/add/wedding-rings', data),
    addProduct: (data) => axiosInstance.post('/api/cart/add/products', data),
    removeDiamond: (data) => axiosInstance.post('/api/cart/remove/diamonds', data),
    removeEngagement: (data) => axiosInstance.post('/api/cart/remove/engagement-rings', data),
    removeWedding: (data) => axiosInstance.post('/api/cart/remove/wedding-rings', data),
    removeProduct: (data) => axiosInstance.post('/api/cart/remove/products', data),
    checkPromocode: (data) => axiosInstance.post('/api/promocode/apply', data),
    clearPromocode: () => axiosInstance.delete(`/api/promocode/remove`),
  },
  checkout: {
    createOrder: (data) => axiosInstance.post('/api/order/create', data),
    createInvoiceOrder: (data) => axiosInstance.post('/api/order/create-invoice', data),
    createFastPaypalOrder: () => axiosInstance.post('/api/order/create/paypal'),
    getOrder: (id) => axiosInstance.get(`/api/order/get/${id}`),
    getOrderByToken: (token) => axiosInstance.get(`/api/order/token/${token}`),
    getPaymentMethods: () => axiosInstance.get('/api/payment/paysystems'),
    proceedPayment: (data) => axiosInstance.post('/api/payment/proceed', data),
    executePaypalPayment: (data) => axiosInstance.post('/api/payment/paypal', data),
    executeAdyenPayment: (data) => axiosInstance.post('/api/payment/adyen', data),
    executeAlipayPayment: (data) => axiosInstance.post('/api/payment/alipay', data),


    createOrderServices: (data) => axiosInstance.post('/api/order/create-invoice', data),

  },
  constructor: {
    checkItems: (data) => axiosInstance.post(`/api/constructor/match-products`, data),
    createRing: (data) => axiosInstance.post(`/api/constructor/complete-rings`, data),
    deleteRing: (data) => axiosInstance.post(`/api/constructor/complete-rings/delete`, data),
    updateRing: (data) => axiosInstance.put(`/api/constructor/complete-rings`, qs.stringify(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}),
    getRings: () => axiosInstance.get('/api/constructor/complete-rings'),
    getDiamondsWithSetting: ({data, page = 1, perPage = 10}, settingId, config) => axiosInstance.post(`/api/constructor/filter-diamonds/${settingId}?page=${page}&per_page=${perPage}`, data, config),
    getRingsWithDiamond: ({data, page = 1, perPage = 10}, diamondId, config) => axiosInstance.post(`/api/constructor/filter-rings/${diamondId}?page=${page}&per_page=${perPage}`, data, config),
    getShareId: () => axiosInstance.post('/api/share-complete-rings/link'),
    getSharedList: (id) => axiosInstance.get(`/api/share-complete-rings/list/${id}`)
  },
  reviews: {
    getEngagementCategory: ({page = 1, perPage = 10}) => axiosInstance.get(`/api/reviews/engagement-rings?page=${page}&per_page=${perPage}`),
    getWeddingCategory: ({page = 1, perPage = 10}) => axiosInstance.get(`/api/reviews/wedding-rings?page=${page}&per_page=${perPage}`),
    getCatalogCategory: ({id, page = 1, perPage = 10}) => axiosInstance.get(`/api/reviews/catalog-products?page=${page}&per_page=${perPage}`),

    getEngagementRing: ({id, page = 1, perPage = 10}) => axiosInstance.get(`/api/reviews/engagement-rings/${id}?page=${page}&per_page=${perPage}`),
    getWeddingRing: ({id, page = 1, perPage = 10}) => axiosInstance.get(`/api/reviews/wedding-rings/${id}?page=${page}&per_page=${perPage}`),
    getCatalogJewellery: ({id, page = 1, perPage = 10}) => axiosInstance.get(`/api/reviews/catalog-products/${id}?page=${page}&per_page=${perPage}`),
    create: (data) => axiosInstance.post('/api/reviews/add', data, { headers: {'Content-Type': 'multipart/form-data' }})
  },
  favorite: {
    getFavorites: () => axiosInstance.get('/api/favorites/all'),
    getDiamonds: () => axiosInstance.get('/api/favorites/diamonds'),
    getEngagementRings: () => axiosInstance.get('/api/favorites/engagement-rings'),
    getWeddingRings: () => axiosInstance.get('/api/favorites/wedding-rings'),
    getProducts: () => axiosInstance.get('/api/favorites/products'),
    addDiamond: (data) => axiosInstance.post('/api/favorites/add/diamonds', data),
    addEngagementRing: (data) => axiosInstance.post('/api/favorites/add/engagement-rings', data),
    addWeddingRing: (data) => axiosInstance.post('/api/favorites/add/wedding-rings', data),
    addProduct: (data) => axiosInstance.post('/api/favorites/add/products', data),
    removeDiamond: (data) => axiosInstance.post('/api/favorites/remove/diamonds', data),
    removeEngagementRing: (data) => axiosInstance.post('/api/favorites/remove/engagement-rings', data),
    removeWeddingRing: (data) => axiosInstance.post('/api/favorites/remove/wedding-rings', data),
    removeProduct: (data) => axiosInstance.post('/api/favorites/remove/products', data),
    removeAllDiamonds: () => axiosInstance.post('/api/favorites/remove-all/diamonds'),
    removeAllEngagementRings: () => axiosInstance.post('/api/favorites/remove-all/engagement-rings'),
    removeAllWeddingRings: () => axiosInstance.post('/api/favorites/remove-all/wedding-rings'),
    removeAllProducts: () => axiosInstance.post('/api/favorites/remove-all/products'),
    removeAll: () => axiosInstance.post('/api/favorites/remove-all'),

    getShareList: (id) => axiosInstance.get(`/api/share-list/${id}`),
    shareDiamonds: (data) => axiosInstance.post('/api/favorites/share/diamonds', data),
    shareEngagementRings: (data) => axiosInstance.post('/api/favorites/share/engagement-rings', data),
    shareWeddingRings: (data) => axiosInstance.post('/api/favorites/share/wedding-rings', data),
    shareProducts: (data) => axiosInstance.post('/api/favorites/share/products', data),
  },
  compare: {
    getCompare: () => axiosInstance.get('/api/compare/all'),
    getDiamonds: () => axiosInstance.get('/api/compare/diamonds'),
    getEngagementRings: () => axiosInstance.get('/api/compare/engagement-rings'),
    getWeddingRings: () => axiosInstance.get('/api/compare/wedding-rings'),
    getProducts: () => axiosInstance.get('/api/compare/products'),
    addDiamond: (data) => axiosInstance.post('/api/compare/add/diamonds', data),
    addEngagementRing: (data) => axiosInstance.post('/api/compare/add/engagement-rings', data),
    addWeddingRing: (data) => axiosInstance.post('/api/compare/add/wedding-rings', data),
    addProduct: (data) => axiosInstance.post('/api/compare/add/products', data),
    removeDiamond: (data) => axiosInstance.post('/api/compare/remove/diamonds', data),
    removeEngagementRing: (data) => axiosInstance.post('/api/compare/remove/engagement-rings', data),
    removeWeddingRing: (data) => axiosInstance.post('/api/compare/remove/wedding-rings', data),
    removeProduct: (data) => axiosInstance.post('/api/compare/remove/products', data),
    removeAllDiamonds: () => axiosInstance.post('/api/compare/remove-all/diamonds'),
    removeAllEngagementRings: () => axiosInstance.post('/api/compare/remove-all/engagement-rings'),
    removeAllWeddingRings: () => axiosInstance.post('/api/compare/remove-all/wedding-rings'),
    removeAllProducts: () => axiosInstance.post('/api/compare/remove-all/products'),
    removeAll: () => axiosInstance.post('/api/favorites/remove-all'),
    shareDiamonds: (data) => axiosInstance.post('/api/compare/share/diamonds', data),
    shareEngagementRings: (data) => axiosInstance.post('/api/compare/share/engagement-rings', data),
    shareWeddingRings: (data) => axiosInstance.post('/api/compare/share/wedding-rings', data),
    shareProducts: (data) => axiosInstance.post('/api/compare/share/products', data),
  },
  auth: {
    signUp: (data) => axiosInstance.post('/api/auth/register', data),
    login: (data) => axiosInstance.post('/api/auth/login', data),
    getUserData: () => axiosInstance.get('/api/auth/userdata'),
    logout: () => axiosInstance.post('/api/auth/logout'),
    confirmEmail: (signature) => axiosInstance.get(`/api/auth/verify/${signature}`),
    resetPassword: (data) => axiosInstance.post('/api/auth/resetpassword', data),
    resendEmail: (data) => axiosInstance.post('/api/auth/resend-verify-email', data),
    changePassword: (data) => axiosInstance.post('/api/auth/changepassword', data),
  },
  main: {
    slider: () => axiosInstance.get('/api/main_slider'),
    sliderMobile: () => axiosInstance.get('/api/main_slider_mobile'),
    occasionSlider: () => axiosInstance.get('/api/blocks/occasion-slider'),
    suggestedRings: () => axiosInstance.get('/api/blocks/recommend-products/homepage'),
    alsoSuggestedRings: () => axiosInstance.get('/api/homepage-suggest'),
    shapesBanner: () => axiosInstance.get('/api/shapes-banner'),
    comingSoonCategories: () => axiosInstance.get('/api/product-categories/all'),
    suggestedCategories: () => axiosInstance.get('/api/product-categories/suggested'),
    subscribeForm: () => axiosInstance.get('/api/subscribe/get-form'),
    subscribe: (data) => axiosInstance.post('/api/subscribe/save', data),
    showroom: () => axiosInstance.get('/api/show-rooms'),
    customJewelry: () => axiosInstance.get('/api/blocks/story-custom-jewelry'),
    weddingAndAnniversary: () => axiosInstance.get('/api/homepage-wedding-anniversary'),
    youHaveSeen: () => axiosInstance.get('/api/your-picks') //wedding && engagement
  },
  diamondsFeed: {
    getCertificateTabs: (config) => axiosInstance.get('/api/blocks/certificate/diamonds-feed', config),
    getFilters: (config) => axiosInstance.get('/api/diamonds-filters', config),
    getDiamonds: ({data, page = 1, perPage = 50, offline=0}, config) => axiosInstance.post(`/api/diamonds/get?page=${page}&per_page=${perPage}&offline=${offline}`, data, config),
    getPromoBlocks: (config) => axiosInstance.get(`/api/blocks/promo/${config}`),
    getPhotoSlider: (config) => axiosInstance.get('/api/blocks/slider/diamonds-feed', config),
    getExpertChoice: (config) => axiosInstance.get('/api/seo/blocks/diamonds-expert', config),
    getFirstRingSlider: (config) => axiosInstance.get('/api/engagement-rings-for-diamond', config),
    getSecondRingSlider: (config) => axiosInstance.get('/api/blocks/second-rings-slider', config),
    // getDiamondsBanners: () => axiosInstance.get('/api/banners')
  },
  diamond: {
    getDiamond: (id) => axiosInstance.get(`/api/diamonds/${id}`),
    getCompleteLook: (config) => axiosInstance.get('/api/blocks/complete-look', config),
    getSimilarDiamonds: (id) => axiosInstance.get(`/api/diamonds-similar/${id}`),
    getRecommendedRing: () => axiosInstance.get('/api/blocks/recommend-products/diamonds-detail'),
    // getYouHaveSeen: () => axiosInstance.get('/api/viewed/diamond'),
    getGuide: (config) => axiosInstance.get('/api/blocks/guide/diamonds-detail', config)
  },
  catalogFeed: {
    getCatalog: ({slug, data, page = 1, perPage = 50}, config) => axiosInstance.get(`/api/products/category/${slug}?page=${page}&per_page=${perPage}&${data.query}`, config),
    // getCatalog: (slug) => axiosInstance.get(`/api/products/category/${slug}`),
    getFilters: (slug) => axiosInstance.get(`/api/products/filters/${slug}`),
  },
  catalog: {
    getCatalog: (id) => axiosInstance.get(`/api/products/show/${id}`)
  },
  engagementFeed: {
    getRings: ({data, page = 1, perPage = 50}, config) => axiosInstance.post(`/api/engagement-rings/get?page=${page}&per_page=${perPage}`, data, config),
    getFilters: () => axiosInstance.get('/api/engagement-rings-filters'),
    getTopPicks: (config) => axiosInstance.get('/api/blocks/top-picks/engagement-rings-feed', config),
    getYourPicks: (config) => axiosInstance.get('/api/your-picks/engagement-rings', config),
    getPhotoSlider: (config) => axiosInstance.get('/api/blocks/slider/engagement-rings-feed', config),
    getEasyShopping: (config) => axiosInstance.get('/api/blocks/additional-info/engagement-rings-feed', config)
  },
  engagementRing: {
    getRing: (id) => axiosInstance.get(`/api/engagement-rings/${id}`),
    getSuggestions: (config) => axiosInstance.get('/api/blocks/recommend-products/engagement-rings-detail', config),
    getRecommendedDiamonds: ({ ringId }, config) => axiosInstance.get(`/api/recommend-diamonds/${ringId}`, config),
    getYouHaveSeen: (config) => axiosInstance.get('/api/viewed/engagement-rings', config),
    getGuide: (config) => axiosInstance.get('/api/blocks/guide/engagement-rings-detail', config)
  },
  weddingFeed: {
    getFilters: () => axiosInstance.get('/api/wedding-rings-filters'),
    getRings: ({data, page = 1, perPage = 50}) => axiosInstance.post(`/api/wedding-rings/get?page=${page}&per_page=${perPage}`, data),
    getTopPicks: (config) => axiosInstance.get('/api/blocks/top-picks/wedding-rings-feed', config),
    getYourPicks: (config) => axiosInstance.get('/api/your-picks/wedding-rings', config),
    getPhotoSlider: (config) => axiosInstance.get('/api/blocks/slider/wedding-rings-feed', config),
    getEasyShopping: (config) => axiosInstance.get('/api/blocks/additional-info/wedding-rings-feed', config)
  },
  weddingRing: {
    getRing: (id) => axiosInstance.get(`/api/wedding-rings/${id}`),
    // getSuggestionsRing: (config) => axiosInstance.get('/api/blocks/recommend-products/wedding-rings-detail', config),
    // getYouHaveSeen: () => axiosInstance.get('/api/viewed/engagement-rings'),
    getMoreMetals: (id, config) => axiosInstance.get(`/api/weddings-more-metals/${id}`, config),
    getSimilarCollections: (id, config) => axiosInstance.get(`/api/weddings-similar-collections/${id}`, config),
    getGuide: (config) => axiosInstance.get('/api/blocks/guide/wedding-rings-detail', config)
  },
  blog: {
    getCategories: () => axiosInstance.get('/api/blog/categories'),
    getTopArticles: () => axiosInstance.get('/api/blog/top-articles'),
    getArticles: ({page, perPage}) => axiosInstance.get(`/api/blog/list?page=${page}&per_page=${perPage}`),
    getArticlesByCategory: ({slug, page, perPage}) => axiosInstance.get(`/api/blog/list/${slug}?page=${page}&per_page=${perPage}`),
    getArticle: ({slug}) => axiosInstance.get(`/api/blog/article/${slug}`),
    getRelatedArticles: ({slug}) => axiosInstance.get(`/api/blog/related/${slug}`),
  },
  static: {
    getPage: (page) => axiosInstance.get(`/api/static/get-page/${page}`),
    faq: () => axiosInstance.get('/api/faq'),
    getContactUsInfo: () => axiosInstance.get('/api/blocks/contacts-page')
  },
  shared: {
    sendHint: (data) => axiosInstance.post('/api/product-send-hint', data),
    videoHints: () => axiosInstance.get('/api/filter-videos'),
    getMetaTags: (slug) => axiosInstance.get(`/api/seo/meta/${slug}`),
    getMetaTagsProduct: (slug) => axiosInstance.get(`/api/seo/meta/catalog/${slug}`),
    getSeoTextBlock: (slug) => axiosInstance.get(`/api/seo/blocks/${slug}`),
  },
  landing: {
    fetchData: (slug) => axiosInstance.get(`/api/landing/${slug}`)
  },
  discountModal: {
    getContent: () => axiosInstance.get('/api/promo_registration/content'),
    registerUser: (data) => axiosInstance.post('/api/promo_registration/register', data),
  }
});

export class ApiService {
  constructor(config) {
    this.axios = axios.create(config);
    this.api = createApiRouting(this.axios);
  }
}

export const client = new ApiService();
const api = client.api;

export default api;
